import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useAuthContext } from "../../contexts"
import * as yup from "yup"

const LoginSchema=yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().email().required().min(5)
})

interface ILoginProps{
children:React.ReactNode
}

export const Login: React.FC<ILoginProps> = ({children}) =>{
    const {isAuthenticated, login} = useAuthContext()
    const [isLoading, setIsLoading]=useState(false)
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [emailError, setEmailError]=useState("")
    const [passwordError, setPasswordError]=useState("")

    const handleSubmit = () =>{
        setIsLoading(true)
        LoginSchema
        .validate({email,password}, {abortEarly:false})
        .then(dicesValidated =>{
            setIsLoading(true)
            login(dicesValidated.email, dicesValidated.password)
            .then(()=>{
                setIsLoading(false)
            })
        })
        .catch((errors:yup.ValidationError)=>{
            setIsLoading(false)
            errors.inner.forEach(error=>{
                if (error.path === "email") {
                    setEmailError(error.message)
                } else if (error.path ===password){
                    setPasswordError(error.message)
                }
            })
        })
    }


    if(isAuthenticated) return(
        <>{children}</>
    )



    return(
        <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2} width={250}>
                        <Typography variant="h6" align="center" >Identifique-se</Typography>
                        <TextField
                        label="E-mail"
                        type="email"
                        fullWidth
                        value={email}
                        disabled={isLoading}
                        onChange={e=>setEmail(e.target.value)}
                        onKeyDown={()=>setEmailError("")}
                        error={!!emailError}
                        helperText={emailError}
                        />
                        <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        value={password}
                        disabled={isLoading}
                        onChange={e=>setPassword(e.target.value)}
                        onKeyDown={()=>setPasswordError("")}
                        error={!!passwordError}
                        helperText={emailError}
                        />
                    </Box>

                </CardContent>
                <CardActions>
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        endIcon={ isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20} /> : undefined}
                        >

                            entrar
                        </Button>

                    </Box>
                </CardActions>
            </Card>
            Login
        </Box>
    )
}