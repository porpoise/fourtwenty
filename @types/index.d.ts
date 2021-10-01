declare namespace FourTwenty {
    type CanBePromise<T> = T | Promise<T>;

    type CanBeArray<T> = T | T[];

    type PropType = object | null;

    type ChildWrapper = () => RenderableResult;

    type RenderableResult = CanBePromise<string | IElement>;

    interface IElement {
        tag: string;
        props: PropType;
        children: ChildWrapper[];
    }

    type Component<Props extends PropType = {}> =
        (props: Props, children: RenderableResult[]) =>
            RenderableResult | RenderableResult[];

    function el<Props extends PropType>(
        tag: string | JSX.Component<Props>,
        props: Props,
        ...children: RenderableResult[]
    ): Promise<CanBeArray<RenderableResult>>;

    async function render(root: CanBePromise<IElement>): Promise<string>;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [tag: string]: any;
        }

        type Element = FourTwenty.IElement;

        type Component<Props extends FourTwenty.PropType = {}> = FourTwenty.Component<Props>;
    }
}

export = FourTwenty;
