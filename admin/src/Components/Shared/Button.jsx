// FILE: src/Components/Shared/Button.jsx  (full rewrite — no shadow, golden border variant, reflection effect)
import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-secondary text-primary hover:bg-secondary-dark focus-visible:ring-secondary-dark",
  outline:
    "border-2 border-secondary text-white hover:bg-secondary hover:text-primary focus-visible:ring-secondary",
  ghost:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...rest
}) {
  const classes = `btn-reflect inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant] || VARIANTS.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
