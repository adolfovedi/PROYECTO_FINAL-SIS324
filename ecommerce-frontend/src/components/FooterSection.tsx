import React, { Children } from "react";

interface FooterSectionProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

const FooterSection = ({ title, children, className}: FooterSectionProps) => (
	<div className={`w-1/2 w-max${className || ""}`}>
		<h3 className="mb-4 text-xl font-bold">{title}</h3>
		{children}
	</div>
);

export default FooterSection;