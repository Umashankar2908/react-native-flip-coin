interface ConditionalRenderProps {
  condition: boolean;
  ifTrue: any;
  ifFalse: any;
}

export const ConditionalRender = ({
  condition,
  ifTrue,
  ifFalse,
}: ConditionalRenderProps) => {
  return condition ? ifTrue : ifFalse;
};
