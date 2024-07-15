import {ReactNode} from "react";
import {Loader} from "#comp/Loader.jsx";

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    type: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    className?: string;
    isPending?: boolean;
    children?: ReactNode;
}

const Button = ({
                    variant,
                    type,
                    className = '',
                    disabled = false,
                    children,
                    isPending = false,
                    ...props
                }: ButtonProps) => {
    if (isPending) {
        disabled = true
    }

    className = className ? ` ${className}` : ''

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'btn-success',
        danger: 'btn-danger',
        warning: 'btn-warning',
        info: 'btn-info',
    }
    return (
        <button type={type} className={`btn ${variants[variant]}${className}`} disabled={disabled} {...props}>
            {isPending ?
                <Loader size={"sm"}/> : children
            }
        </button>
    );
};

export default Button;
