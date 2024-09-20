import SignInForm from "../Components/SignInForm";
import 'animate.css';





const SignIn = () => {

    return (
        <>
            <div className="text-center">
                <h3 className="animate__animated animate__pulse animate__slow animate__infinite">Sign in below to begin your experience</h3>
            </div>
            <SignInForm />
        </>
    )
}
export default SignIn;

