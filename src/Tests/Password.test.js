import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";

const postMock = vi.fn();
const getMock = vi.fn();

vi.spyOn(axios, "post").mockImplementation(postMock);
vi.spyOn(axios, "get").mockImplementation(getMock);

import AuthService from "../Services/AuthService";
import createPasswordApi from "../Services/PasswordService";

describe("Auth and PasswordService flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw error on login failure", async () => {
    const error = {
      response: {
        status: 401,
        data: { message: "Invalid credentials" },
      },
    };
    postMock.mockRejectedValueOnce(error);

    await expect(
      AuthService.login("user@example.com", "wrongpassword")
    ).rejects.toMatchObject(error);
  });

  it("should login, get token and then fetch all passwords with count > 0", async () => {
    const tokenData = { token: "abc123" };
    postMock.mockResolvedValueOnce({ data: tokenData, status: 200 });
    const loginResult = await AuthService.login(
      "test@example.com",
      "test12345"
    );

    const passwordApi = createPasswordApi(loginResult.token);

    const passwords = await passwordApi.getAllPasswords();

    expect(Array.isArray(passwords)).toBe(true);
    expect(passwords.length).toBeGreaterThan(0);
  });
});
