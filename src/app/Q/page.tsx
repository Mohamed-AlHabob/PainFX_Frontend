import TestModels from "@/components/global/test";
import CreateNewPost from "@/feature/qstit/components/create-post";
import Menu from "@/feature/qstit/components/group-navbar";
import { LeaderBoardCard } from "@/feature/qstit/components/leaderboard";
import { PostFeed } from "@/feature/qstit/components/post-feed";

const QPage = () => {
return (
     
  <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5 s">
  <div className="col-span-1 lg:inline relative hidden py-5">
    <LeaderBoardCard light />
  </div>
  <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
    <Menu orientation="desktop" />
    <CreateNewPost
      userImage={"/file.svg"}
      channelid={""}
      username={"mohamed"}
    />

    <PostFeed/>
  </div>
  <div className="col-span-1 hidden lg:inline relative py-5">
    {/* <GroupSideWidget light /> */}
  </div>
</div>

  );
}
 
export default QPage;