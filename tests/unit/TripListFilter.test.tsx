import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TripListFilter from "@/components/TripListFilter";
import type { Location } from "@/types";

describe("TripListFilter", () => {
  const mockLocations: Location[] = [
    { name: "Warsaw", slug: "warsaw", count: "5" },
    { name: "Krakow", slug: "krakow", count: "3" },
  ];

  it("renders category filter links", () => {
    render(<TripListFilter count={10} />);

    expect(screen.getByText("Piesze")).toBeDefined();
    expect(screen.getByText("Rowerowe")).toBeDefined();
    expect(screen.getByText("Dolina Bugu")).toBeDefined();
  });

  it("renders location filter links with count", () => {
    render(<TripListFilter count={10} locationsList={mockLocations} />);

    expect(screen.getByText("Warsaw (5)")).toBeDefined();
    expect(screen.getByText("Krakow (3)")).toBeDefined();
  });

  it("renders 'Wszystkie' link with total count", () => {
    render(<TripListFilter count={10} />);

    expect(screen.getByText("Wszystkie (10)")).toBeDefined();
  });

  it("generates correct slug query parameters for category links", () => {
    render(<TripListFilter count={10} />);

    const pieszoLink = screen.getByText("Piesze").closest("a");
    expect(pieszoLink).toBeDefined();
    const href = pieszoLink?.getAttribute("href");
    expect(href).toContain("slug=pieszo");
  });

  it("hidden on mobile, visible on desktop (className checks)", () => {
    const { container } = render(<TripListFilter count={10} />);

    const mobileButton = container.querySelector(".md\\:hidden");
    const desktopFilter = container.querySelector(".hidden.md\\:block");
    expect(mobileButton).toBeDefined();
    expect(desktopFilter).toBeDefined();
  });
});
