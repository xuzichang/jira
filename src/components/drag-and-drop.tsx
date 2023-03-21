/*
 * @Description:
 * @Date: 2023-03-21 15:16:53
 * @LastEditTime: 2023-03-21 16:28:18
 */
import React, { ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";
// 修改DroppableProps属性定义。children原来是函数，换成ReactNode
type DropProps = Omit<DroppableProps, "children"> & {
  children: React.ReactNode;
};
export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children as any, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
// forwardRef 使用ref
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragChildProps = Omit<DraggableProps, "children"> & {
  children: ReactNode;
};
export const Drag = ({ children, ...props }: DragChildProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children as any, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
            name: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};
