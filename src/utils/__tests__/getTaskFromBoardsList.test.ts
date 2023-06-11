// import { getBoardByTaskId } from "../getTaskFromBoardsList";

// describe("getBoardByTaskId", () => {
//     it("should return the board id if the task is in the board", () => {
//         const boards = [
//         {
//             id: "board-1",
//             columns: [
//             {
//                 id: "column-1",
//                 tasks: [
//                 {
//                     id: "task-1",
//                     title: "Task 1",
//                 },
//                 ],
//             },
//             ],
//         },
//         ];
//         const taskId = "task-1";

//         expect(getBoardByTaskId(taskId, boards)).toBe("board-1");
//     });

//     it("should return undefined if the task is not in the board", () => {
//         const boards = [
//         {
//             id: "board-1",
//             columns: [
//             {
//                 id: "column-1",
//                 tasks: [
//                 {
//                     id: "task-1",
//                     title: "Task 1",
//                 },
//                 ],
//             },
//             ],
//         },
//         ];
//         const taskId = "task-2";

//         expect(getBoardByTaskId(taskId, boards)).toBe(undefined);
//     });
//     }
