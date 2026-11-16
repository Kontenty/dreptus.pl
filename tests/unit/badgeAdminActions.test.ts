import { revalidatePath, updateTag } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { addBadge } from "@/lib/actions/add-badge";
import { deleteBadge } from "@/lib/actions/delete-badge";
import { reorderBadgeDegrees } from "@/lib/actions/reorder-badge-degrees";
import { prisma } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    badge: {
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  updateTag: vi.fn(),
}));

const mockedPrisma = vi.mocked(prisma);
const mockedRevalidatePath = vi.mocked(revalidatePath);
const mockedUpdateTag = vi.mocked(updateTag);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("badge administration actions", () => {
  describe("addBadge", () => {
    it("validates input before accessing the database", async () => {
      await expect(addBadge({ name: "", slug: "" })).rejects.toThrow(
        "Nieprawidłowe dane",
      );
      expect(mockedPrisma.badge.findUnique).not.toHaveBeenCalled();
    });

    it("rejects a duplicate slug", async () => {
      vi.mocked(mockedPrisma.badge.findUnique).mockResolvedValue({
        id: 1,
      } as never);
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      await expect(addBadge({ name: "Hiker", slug: "hiker" })).rejects.toThrow(
        "Odznaka z tym slugiem już istnieje",
      );
      expect(mockedPrisma.badge.create).not.toHaveBeenCalled();
      error.mockRestore();
    });

    it("creates a badge, normalizes optional values, and revalidates pages", async () => {
      vi.mocked(mockedPrisma.badge.findUnique).mockResolvedValue(null);
      const createdBadge = { id: 3, name: "Hiker", slug: "hiker" };
      vi.mocked(mockedPrisma.badge.create).mockResolvedValue(
        createdBadge as never,
      );

      const result = await addBadge({ name: "Hiker", slug: "hiker" });

      expect(result).toEqual({ success: true, badge: createdBadge });
      expect(mockedPrisma.badge.create).toHaveBeenCalledWith({
        data: {
          name: "Hiker",
          slug: "hiker",
          description: null,
          rules_page_id: null,
        },
      });
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/admin/badges");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/badges");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("deleteBadge", () => {
    it("does not delete a badge that does not exist", async () => {
      vi.mocked(mockedPrisma.badge.findUnique).mockResolvedValue(null);
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      await expect(deleteBadge(404)).rejects.toThrow(
        "Odznaka nie została znaleziona",
      );
      expect(mockedPrisma.badge.delete).not.toHaveBeenCalled();
      error.mockRestore();
    });

    it("deletes an existing badge and revalidates pages", async () => {
      vi.mocked(mockedPrisma.badge.findUnique).mockResolvedValue({
        id: 3,
        _count: { scorers: 0 },
      } as never);
      vi.mocked(mockedPrisma.badge.delete).mockResolvedValue({
        id: 3,
      } as never);

      await expect(deleteBadge(3)).resolves.toEqual({
        success: true,
        message: "Odznaka została usunięta",
      });
      expect(mockedPrisma.badge.delete).toHaveBeenCalledWith({
        where: { id: 3 },
      });
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/admin/badges");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/badges");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/");
    });
  });

  describe("reorderBadgeDegrees", () => {
    it("rejects duplicate or invalid degree ids", async () => {
      await expect(
        reorderBadgeDegrees({ badgeId: 1, degreeIds: [2, 2] }),
      ).rejects.toThrow("Nieprawidłowa kolejność stopni odznaki");
      expect(mockedPrisma.$transaction).not.toHaveBeenCalled();
    });

    it("rejects a stale degree list without updating order", async () => {
      vi.mocked(mockedPrisma.$transaction).mockImplementation(
        async (callback) =>
          callback({
            badgeDegree: {
              findMany: vi.fn().mockResolvedValue([{ id: 1 }, { id: 2 }]),
              update: vi.fn(),
            },
          } as never),
      );

      await expect(
        reorderBadgeDegrees({ badgeId: 1, degreeIds: [1, 3] }),
      ).rejects.toThrow("Lista stopni uległa zmianie");
      expect(mockedUpdateTag).not.toHaveBeenCalled();
    });

    it("updates all degree sort positions in the requested order", async () => {
      const update = vi.fn();
      vi.mocked(mockedPrisma.$transaction).mockImplementation(
        async (callback) =>
          callback({
            badgeDegree: {
              findMany: vi.fn().mockResolvedValue([{ id: 10 }, { id: 20 }]),
              update,
            },
          } as never),
      );

      await reorderBadgeDegrees({ badgeId: 1, degreeIds: [20, 10] });

      expect(update).toHaveBeenNthCalledWith(1, {
        where: { id: 20, badge_id: 1 },
        data: { sort_order: 0 },
      });
      expect(update).toHaveBeenNthCalledWith(2, {
        where: { id: 10, badge_id: 1 },
        data: { sort_order: 1 },
      });
      expect(mockedUpdateTag).toHaveBeenCalledWith("badges");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/admin/badges");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/badges", "layout");
      expect(mockedRevalidatePath).toHaveBeenCalledWith("/");
    });
  });
});
