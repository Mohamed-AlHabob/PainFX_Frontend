"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

const TestModels = () => {
    const { onOpen } = useModal();

    return ( 
        <div className="flex flex-col gap-y-3 m-auto">
    <Button type="submit" className="rounded-2xl" variant={"outline"} onClick={() => onOpen("deletedocument")}>
        Test Modal
    </Button>
    </div>
     );
}
 
export default TestModels;