import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@src/lib/utils";
import { forwardRef } from "react";

const Root = (props: Dialog.DialogProps) => <Dialog.Root {...props} />;

const Trigger = forwardRef<HTMLButtonElement, Dialog.DialogTriggerProps>(
  (props, ref) => <Dialog.Trigger ref={ref} {...props} />
);

Trigger.displayName = "ModalTrigger";

const Content = (props: Dialog.DialogContentProps) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-20" />
    <Dialog.Content
      {...props}
      className={cn(
        "fixed top-[10%] left-1/2 -translate-x-1/2 bg-background rounded-lg w-[96vw] max-w-xl max-h-[85vh] overflow-y-auto z-30",
        props.className
      )}
    />
  </Dialog.Portal>
);

const Title = (props: Dialog.DialogTitleProps) => (
  <Dialog.Title
    {...props}
    className={cn("text-xl font-medium text-foreground", props.className)}
  />
);

const Description = (props: Dialog.DialogDescriptionProps) => (
  <Dialog.Description
    {...props}
    className={cn("text-sm text-muted-foreground", props.className)}
  />
);

const Close = (props: Dialog.DialogCloseProps) => <Dialog.Close {...props} />;

export const Modal = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
};
