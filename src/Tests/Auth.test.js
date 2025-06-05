import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";

const postMock = vi.fn();

vi.spyOn(axios, "create").mockImplementation(() => ({
  post: postMock,
}));

import AuthService from "../Services/AuthService";

describe("AuthService login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return token and status 200 on successful login", async () => {
    const tokenData = { token: "abc123" };
    postMock.mockResolvedValueOnce({ data: tokenData, status: 200 });

    const result = await AuthService.login("test@example.com", "test12345");

    expect(result.token).toBeDefined();
    expect(result.token).not.toBe("");
 });

  it("should throw error with status 401 if login fails and no token", async () => {
    const error = {
      response: {
        status: 401,
        data: { message: "Invalid credentials" },
      },
    };
    postMock.mockRejectedValueOnce(error);

    await expect(
      AuthService.login("user@example.com", "wrongpassword")
    ).rejects.toMatchObject({
      response: {
        status: 401,
        data: { message: "Invalid credentials" },
      },
    });
  });
});
