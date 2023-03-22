import Card from "../components/Card";
import { Header } from "../components";

function Home() {
  return (
    <div>
      <Header />
      <Card
        title="InterviewMe"
        img="/images/Lorem ipsum.png"
        link="/:id"
        time="2"
        description="Built with GPT-3, React, and Flask. Practice interviews with AI and ace your next interview."
      />
    </div>
  );
}

export default Home;
