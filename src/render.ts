import { CanBePromise, PropType, IElement } from "@types";

const SELF_CLOSING_TAGS = [
    "link", "meta", "img", "input", "br", "area", "source",
    "base", "hr", "col", "embed", "param", "track", "wbr",
];

const buildAttrsFrom = (props: PropType | null) => (props ? Object.entries(props)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("").trimEnd()
    : "");

export async function render(root: CanBePromise<IElement>): Promise<string> {
    const { tag, props, children } = await Promise.resolve(root);

    if (SELF_CLOSING_TAGS.includes(tag)) {
        return `<${tag}${buildAttrsFrom(props)}/>`;
    }

    let childString = "";

    for (const c of children) {
        const val = await c();
        if (typeof val === "string") childString += val;
        else childString += await render(val);
    }

    return `<${tag}${buildAttrsFrom(props)}>${childString}</${tag}>`;
}
