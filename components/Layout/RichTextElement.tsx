import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import Headline from "./Headline";
import Ul, { Li } from "./Ul";

interface iRichTextElement {
  children: {
    [k: string]: unknown;
  }[];
}
const RichTextElement = ({ children }: iRichTextElement) => {
  const serialize = (children: any) =>
    children.map((node: any, i: number) => {
      if (Text.isText(node)) {
        let text;
        if (!node.text) {
          text = <br />;
        } else {
          text = (
            <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          );
        }
        // @ts-ignore
        if (node.bold) {
          text = <strong key={i}>{text}</strong>;
        }
        // @ts-ignore
        if (node.code) {
          text = <code key={i}>{text}</code>;
        }
        // @ts-ignore
        if (node.italic) {
          text = <em key={i}>{text}</em>;
        }

        // Handle other leaf types here...

        return <Fragment key={i}>{text}</Fragment>;
      }

      if (!node) {
        return null;
      }
      switch (node.type) {
        case "h1":
          return (
            <Headline headline={1} key={i}>
              {serialize(node.children)}
            </Headline>
          );
        case "h2":
          return (
            <Headline headline={2} key={i}>
              {serialize(node.children)}
            </Headline>
          );
        case "h3":
          return (
            <Headline headline={3} key={i}>
              {serialize(node.children)}
            </Headline>
          );
        case "h4":
          return (
            <Headline headline={4} key={i}>
              {serialize(node.children)}
            </Headline>
          );
        case "h5":
          return (
            <Headline headline={5} key={i}>
              {serialize(node.children)}
            </Headline>
          );
        case "h6":
          return (
            <Headline headline={6} key={i}>
              {serialize(node.children)}
            </Headline>
          );
        case "blockquote":
          return <blockquote key={i}>{serialize(node.children)}</blockquote>;
        case "ul":
          return <Ul key={i}>{serialize(node.children)}</Ul>;
        case "ol":
          return <ol key={i}>{serialize(node.children)}</ol>;
        case "li":
          return <Li key={i}>{serialize(node.children)}</Li>;
        case "link":
          return (
            <a href={escapeHTML(node.url)} key={i}>
              {serialize(node.children)}
            </a>
          );

        default:
          return <p key={i}>{serialize(node.children)}</p>;
      }
    });
  return (
    <div>
      {serialize(children).map((item: any) => {
        return item;
      })}
    </div>
  );
};

export default RichTextElement;
