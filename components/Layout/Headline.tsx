import React from "react";

import {css} from "@emotion/react";

import {MarkdownInline} from "./Markdown";
import tw from "twin.macro";

type iHeadlineItem = {
    headline: number;
    children: unknown;
}
const Headline = ({
                      headline = 1,
                      children,
                      ...props
                  }: iHeadlineItem) => {
    const Line = `h${headline}`;

    const getFontSize = () => {
        switch (headline) {
            case 1:
                return tw`
                    text-headline
                    leading-none
                `;
            case 2:
                return tw`
                    text-h-2
                    leading-none
                `;
            case 3:
                return tw`
                    text-h-3
                    leading-none
                `;
            case 4:
                return tw`
                    text-h-4
                    leading-none
                `;
            case 5:
                return tw`
                    text-h-5
                    leading-none
                    `;
            case 6:
                return tw`
                    text-h-6
                    leading-none
                `;
        }
    }

    const style = css`
      ${getFontSize()}
    `;

    return (
        // @ts-ignore
        <Line css={style} {...props}>
            {typeof children === "string" ? (
                <MarkdownInline {...{children}} />
            ) : (
                children
            )}
        </Line>
    );
};

export default Headline;
