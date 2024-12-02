import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {SuccessIcon} from '../components/ui/successIcon'
import { useState } from "react"
import  GetUser from "../api/login"
import  animateSuccessIcon  from '../JS/successIcon';

interface CardWithFormProps {
  setLoginSuccess: (arg0: boolean) => void;
}

export function CardWithForm({ setLoginSuccess }: CardWithFormProps) {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginStatus, setLoginStatus] = useState(0);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
    
      const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const checkUserValid = async() => {
        const result = await(GetUser(email));
        if(result==null || result.userEmail==null){
          setLoginStatus(2);
        }
        else if(result.userPassword==password){
          setLoginStatus(1);
          animateSuccessIcon();
          changingLoginStatus();
        } 
        else{
          setLoginStatus(3);
        }
      };

      const changingLoginStatus = () => {
        const timer = setTimeout(() => {
          setLoginSuccess(true);
        }, 2000);
    
        return () => clearTimeout(timer);
      };

    return (
        <div>
        <Card className={`${loginStatus==0?"w-[350px] h-[350px] flex flex-col justify-between select-none":"hidden"}`}>
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
      
          <CardContent className="flex-grow flex items-center justify-center  pb-10">
            <form className="w-full">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Input 
                        type="email" 
                        id="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full p-2 border ${
                        isEmailValid ? "" : "border-red-500"
                        } rounded`} 
                        required
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Input  
                        type={showPassword ? "text" : "password"}
                        id="password" 
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Password" 
                    />
                    <label className="flex items-center space-x-2 mt-2 text-sm space-y-1.5">
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                        className="form-checkbox text-blue-500"
                    />
                    <span>Show Password</span>
                    </label>
                </div>
              </div>
            </form>
          </CardContent>
      
          <CardFooter className="flex items-center justify-center">
            <Button 
                className="w-full"
                onClick={checkUserValid}
            >
                    Login
            </Button>
          </CardFooter>
        </Card>
        <Card className={`${loginStatus==1?"w-[350px] h-[350px] flex flex-col justify-between select-none":"hidden"}`}>
            <CardContent className="flex-grow flex items-center justify-center">
                <CardTitle className="text-center font-georgia text-2xl tracking-widest pt-4">Login Successful</CardTitle>
            </CardContent>
            <SuccessIcon/>
        </Card>
        <Card className={`${loginStatus==2 || loginStatus==3?"w-[500px] h-[250px] flex flex-col justify-between select-none":"hidden"}`}>
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-center text-2xl">Login Failed</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center text-red-500">
              {loginStatus === 2 ? <div>incorrect email and password!</div> : <div>incorrect password!</div>}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
            <Button 
                className="w-full"
                onClick={() => {setLoginStatus(0);if(loginStatus==2) setEmail("");setPassword("")}}
            >
                    Retry
            </Button>
          </CardFooter>
        </Card>
        </div>
      );
      
}
