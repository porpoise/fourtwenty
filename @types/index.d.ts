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
