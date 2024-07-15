import {ReactNode} from "react";

interface CardProps {
    className?: string;
    children?: ReactNode;
}

interface TitleProps {
    className?: string;
    children?: ReactNode;
}

interface FooterProps {
    className?: string;
    children?: ReactNode;
}

interface BodyProps {
    className?: string;
    children?: ReactNode;
}

const Card = ({className, children, ...props}: CardProps) => {
    className = className ? ` ${className}` : ''
    return (
        <div className={'card' + className} {...props}>
            {children}
        </div>
    )
};

const Header = ({className, children, ...props}: TitleProps) => {
    className = className ? ` ${className}` : ''
    return (
        <div className={'card-header' + className} {...props}>
            <div className="card-title">{children}</div>
        </div>
    )
};

const Footer = ({className, children, ...props}: FooterProps) => {
    className = className ? ` ${className}` : ''
    return (
        <div className={'card-footer' + className} {...props}>
            {children}
        </div>
    )
};

const Body = ({className, children, ...props}: BodyProps) => {
    className = className ? ` ${className}` : ''
    return (
        <div className={'card-body' + className} {...props}>
            {children}
        </div>
    )
};

Card.Header = Header;
Card.Footer = Footer;
Card.Body = Body;

export {Card}