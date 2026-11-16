import * as v from "valibot";
import { describe, expect, it } from "vitest";
import { reportSchema } from "@/lib/schemas/reportSchema";
import validForm from "../__fixtures__/report-form-valid.json";

describe("reportSchema", () => {
  describe("fullName validation", () => {
    it("rejects empty string", () => {
      const result = v.safeParse(reportSchema, { ...validForm, fullName: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe("Imię i nazwisko jest wymagane");
      }
    });

    it("rejects less than 4 characters", () => {
      const result = v.safeParse(reportSchema, {
        ...validForm,
        fullName: "ABC",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe(
          "Imię i nazwisko musi mieć co najmniej 4 znaki",
        );
      }
    });

    it("accepts valid name", () => {
      const result = v.safeParse(reportSchema, validForm);
      expect(result.success).toBe(true);
    });
  });

  describe("email validation", () => {
    it("rejects empty string", () => {
      const result = v.safeParse(reportSchema, { ...validForm, email: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe("Adres email jest wymagany");
      }
    });

    it("rejects invalid format", () => {
      const result = v.safeParse(reportSchema, {
        ...validForm,
        email: "invalid-email",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe("Adres email jest nieprawidłowy");
      }
    });

    it("accepts valid email", () => {
      const result = v.safeParse(reportSchema, validForm);
      expect(result.success).toBe(true);
    });
  });

  describe("trip validation", () => {
    it("rejects empty string", () => {
      const result = v.safeParse(reportSchema, { ...validForm, trip: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe("Trasa jest wymagana");
      }
    });
  });

  describe("date validation", () => {
    it("rejects empty string", () => {
      const result = v.safeParse(reportSchema, { ...validForm, date: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe("Data jest wymagana");
      }
    });
  });

  describe("location validation", () => {
    it("rejects empty string", () => {
      const result = v.safeParse(reportSchema, { ...validForm, location: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe(
          "Klub / miejscowość jest wymagana",
        );
      }
    });
  });

  describe("gdprChecked validation", () => {
    it("rejects false", () => {
      const result = v.safeParse(reportSchema, {
        ...validForm,
        gdprChecked: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues[0].message).toBe("Zgoda jest wymagana");
      }
    });

    it("accepts true", () => {
      const result = v.safeParse(reportSchema, validForm);
      expect(result.success).toBe(true);
    });
  });

  describe("valid input passes", () => {
    it("accepts valid form data from fixture", () => {
      const result = v.safeParse(reportSchema, validForm);
      expect(result.success).toBe(true);
    });
  });
});
