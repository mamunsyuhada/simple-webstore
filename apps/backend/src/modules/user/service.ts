import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { infras } from "../../configs/env.config";
import { ERRORS, AppError } from "../../helpers/error.helper";
import userRepsitory from "./repository";

class UserService {
  async getUserById(id: string): Promise<any> {
    return await userRepsitory.getUserById(id);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    // Find user by email
    const user = await userRepsitory.getUserByEmail(email);

    if (!user) {
      throw new AppError(
        ERRORS.userNotExists.message,
        ERRORS.userNotExists.statusCode,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        ERRORS.userCredError.message,
        ERRORS.userCredError.statusCode,
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      infras.APP_JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return { token };
  }
}

export default new UserService();
