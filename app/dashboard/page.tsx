import Board from "@/components/kanbanboard/board";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <Board />
    </div>
  );
};

export default Dashboard;
