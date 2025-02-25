import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SuccessIcon } from "../components/ui/successIcon";
import { useState } from "react";
import GetUser from "../api/login";
import animateSuccessIcon from "../JS/successIcon";

interface CardWithFormProps {
  setLoginSuccess: (success: boolean) => void;
}

export function CardWithForm({ setLoginSuccess }: CardWithFormProps) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<0 | 1 | 2 | 3>(0);
  const [token, setToken] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const checkUserValid = async () => {
    const result = await GetUser(email, password);

    if (!result || result === "login failed") {
      setLoginStatus(2); // Login failed
    } else {
      setLoginStatus(1); // Login success
      animateSuccessIcon();
      setToken(result);
      localStorage.setItem("authToken", result); // Save token for future requests
      setTimeout(() => setLoginSuccess(true), 2000);
    }
  };

  const handleRetry = () => {
    setLoginStatus(0);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {/* Login Form */}
      <Card className={`${loginStatus === 0 ? "w-[350px] h-[350px] flex flex-col justify-between select-none" : "hidden"}`}>
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow flex items-center justify-center pb-10">
          <form className="w-full">
            <div className="grid w-full items-center gap-4">
              {/* Email Input */}
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
                className={`w-full p-2 border ${isEmailValid ? "" : "border-red-500"} rounded`}
                required
              />

              {/* Password Input */}
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />

              {/* Show Password Toggle */}
              <label className="flex items-center space-x-2 mt-2 text-sm">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                  className="form-checkbox text-blue-500"
                />
                <span>Show Password</span>
              </label>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          <Button className="w-full" onClick={checkUserValid} disabled={!isEmailValid || !password}>
            Login
          </Button>
        </CardFooter>
      </Card>

      {/* Login Success */}
      <Card className={`${loginStatus === 1 ? "w-[350px] h-[350px] flex flex-col justify-between select-none" : "hidden"}`}>
        <CardContent className="flex-grow flex items-center justify-center">
          <CardTitle className="text-center font-georgia text-2xl tracking-widest pt-4">
            Login Successful
          </CardTitle>
        </CardContent>
        <SuccessIcon />
      </Card>

      {/* Login Failed */}
      <Card className={`${loginStatus === 2 || loginStatus === 3 ? "w-[500px] h-[250px] flex flex-col justify-between select-none" : "hidden"}`}>
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-2xl">Login Failed</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center text-red-500">
          {loginStatus === 2 ? <div>Incorrect email or password!</div> : <div>Incorrect password!</div>}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button className="w-full" onClick={handleRetry}>
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
