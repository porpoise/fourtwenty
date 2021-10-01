import {
    CanBeArray, IElement, PropType, RenderableResult,
} from "@types";

export default async function el<Props extends PropType>(
    tag: string | JSX.Component<Props>,
    props: Props,
    ...children: RenderableResult[]
): Promise<CanBeArray<RenderableResult>> {
    props = props || ({} as Props);
    children = children.flat();

    if (typeof tag === "function") {
        return Promise.resolve(tag(props, children));
    }

    return {
        tag,
        props,
        children: children.map((child) => () => Promise.resolve(child)),
    } as IElement;
}
