import React, {useMemo} from 'react';
import ReactMarkdown from "react-markdown";
import HeadlineItem from "./Headline";
import Text from "./Text";
import Ul, {Li} from "./Ul";
import _link from "next/link";
import tw from 'twin.macro';

const Link = tw(_link)`
    underline
`;

const h = (headline: number) => {
    const Headline = ({children}: { children: string }) => (
        <HeadlineItem {...{headline}}>{children}</HeadlineItem>
    );

    return Headline;
};

const defaultComponents = {
    // @ts-ignore
    a: ({href, ...props}) => <Link href={href} {...props} target="_blank"/>,
    h1: h(1),
    h2: h(2),
    h3: h(3),
    h4: h(4),
    h5: h(5),
    h6: h(6),
    p: Text,
    ul: Ul,
    li: Li,
};

type iMarkdown = {
    children: string;
    components?: {}
    props?: unknown
};
const Markdown = ({children, components, ...props}: iMarkdown) => {
    const components_ = useMemo(
        () => ({...defaultComponents, ...components}),
        [components]
    );

    // @ts-ignore
    return <ReactMarkdown components={components_} {...props}>
        {children}
    </ReactMarkdown>;
};

export default Markdown;


// @ts-ignore
export const MarkdownInline = (props) => (
    <Markdown
        allowedElements={["br", "strong", "em", "a", "span"]}
        unwrapDisallowed
        {...props}
    />
);