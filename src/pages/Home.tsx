import { Container, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import Box from "@mui/material/Box";
import Card from "../components/Card";
import { Header } from "../components";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import styles from "../styles/pages/home.module.scss";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "20px",
  },
});

const DATA = [
  {
    title: "InterviewMe",
    description:
      "Built with GPT-3, React, and Flask. Practice interviews with AI and ace your next interview.",
    img: "/images/Lorem ipsum.png",
    link: "/:id",
    time: "2",
  },
  {
    title: "InterviewMe",
    description:
      "Built with GPT-3, React, and Flask. Practice interviews with AI and ace your next interview.",
    img: "/images/Lorem ipsum.png",
    link: "/:id",
    time: "2",
  },
  {
    title: "InterviewMe",
    description:
      "Built with GPT-3, React, and Flask. Practice interviews with AI and ace your next interview.",
    img: "/images/Lorem ipsum.png",
    link: "/:id",
    time: "2",
  },
  {
    title: "InterviewMe",
    description:
      "Built with GPT-3, React, and Flask. Practice interviews with AI and ace your next interview.",
    img: "/images/Lorem ipsum.png",
    link: "/:id",
    time: "2",
  },
  {
    title: "InterviewMe",
    description:
      "Built with GPT-3, React, and Flask. Practice interviews with AI and ace your next interview.",
    img: "/images/Lorem ipsum.png",
    link: "/:id",
    time: "2",
  },
];
function Home() {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" sx={{ padding: "50px 0px" }}>
        <HomeTabs />
      </Container>
    </div>
  );
}

export default Home;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "50px 0" }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type filterType = -1 | 1;
function HomeTabs() {
  const [value, setValue] = useState(0);
  const [filter, setFilter] = useState<filterType>(1);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Tabs
          TabIndicatorProps={{
            style: {
              backgroundColor: "#44924c",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="home tabs"
        >
          <Tab
            sx={{
              fontFamily: "Poppins",
              textTransform: "capitalize",
              color: "black",
              fontSize: "15px",
            }}
            label="All Submission"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontFamily: "Poppins",
              textTransform: "capitalize",
              color: "black",
              fontSize: "15px",
            }}
            label="Favourite Submissions"
            {...a11yProps(1)}
          />
        </Tabs>
        <Box display={"flex"} gap={5} alignItems={"center"}>
          <CustomTextField
            size="small"
            className={styles.search_input}
            id="outlined-basic"
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <AiOutlineSearch size={30} style={{ marginRight: 10 }} />
              ),
            }}
          />
          <Select
            sx={{
              borderRadius: "20px",
            }}
            size="small"
            id="demo-simple-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as filterType)}
          >
            <MenuItem value={1}>Newest</MenuItem>
            <MenuItem value={-1}>Oldest</MenuItem>
          </Select>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <div className={styles.cards_grid}>
          {DATA.map((data, _) => (
            <Card {...data} key={data.title} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.cards_grid}>
          {DATA.map((data, _) => (
            <Card {...data} key={data.title} />
          ))}
        </div>
      </TabPanel>
    </Box>
  );
}
