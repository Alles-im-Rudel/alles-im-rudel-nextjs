import React from 'react';
import Head from "next/head";
import tw from "twin.macro";
import _image from "next/image";
import Input from '../components/Form/Input';
import {SubmitHandler, useForm} from "react-hook-form";
import _headline from '../components/Layout/Headline';
import _button from "../components/Button";
import useAuthStore from "../lib/Auth/store";
import {shallow} from "zustand/shallow";
import {useRouter} from "next/router";

const Container = tw.div`
    w-screen
    min-h-screen
    h-fit
    relative
    flex
    items-center
    flex-col
    lg:flex-row
`;

const BackgroundImage = tw(_image)`
    absolute
    w-full
    z-0
    h-full
    object-cover
`;

const Image = tw(_image)`
    z-1
    h-fit
    lg:w-1/2
    p-6
`;

const LoginContainer = tw.div`
  m-6
  p-6
  z-1
  bg-white
  flex
  items-center
  justify-center
  flex-col
  lg:w-1/2
  lg:h-screen
  lg:m-0
`;

const Card = tw.div`
    w-72
    max-w-full
    flex
    flex-col
    gap-8
`;

const InputWrapper = tw.form`
    flex
    flex-col
    gap-1
`;

const Headline = tw(_headline)`
    w-full
    lg:leading-4
`;

const Button = tw(_button)`
    w-full
    mt-4
`;

export type iLoginForm = {
    email: string;
    password: string;
}
const Login = () => {

    const router = useRouter();

    const [
        login,
        isAuth,
        isLoading,
    ] = useAuthStore((state) => [
        state.login,
        state.isAuth,
        state.isLoading,
    ], shallow);

    const {handleSubmit, control} = useForm<iLoginForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const onSubmit: SubmitHandler<iLoginForm> = async (data) => {
        const res = await login(data);
        res && router.push('/');
    };

    return (
        <>
            <Head>
                <title>Login | Alles im Rudel e.V.</title>
                <meta
                    name="description"
                    content="Alles im Rudel ist ein Verein in Elmshorn, der 2021 gegründet wurde und mehrere Sparten hat, wie z.B. Airsoft oder E-Sports"
                />
            </Head>
            <Container>
                <BackgroundImage
                    priority
                    src="/backgrounds/default.jpg"
                    alt="Hintergrund Alles im Rudel e.V."
                    width={1920}
                    height={1080}
                />
                <Image
                    priority
                    src="/logos/logo-grey-slim.png"
                    alt="Logo Alles im Rudel e.V."
                    width={1000}
                    height={550}
                />
                <LoginContainer>
                    <Card>
                        <Headline headline={1}>
                            Login
                        </Headline>
                        <InputWrapper onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                fullWidth
                                placeholder="E-Mail"
                                name="email"
                                rules={{
                                    required: true,
                                    maxLength: 40,
                                }}
                                control={control}
                            />
                            <Input
                                fullWidth
                                placeholder="Passwort"
                                name="password"
                                type="password"
                                rules={{
                                    required: true,
                                    maxLength: 50,
                                }}
                                control={control}
                            />
                            <Button type="submit" isLoading={isLoading}>Login</Button>
                        </InputWrapper>
                    </Card>
                </LoginContainer>
            </Container>
        </>
    );
};

export default Login;
