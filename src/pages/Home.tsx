import { Container, MenuItem, Select, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import Box from "@mui/material/Box";
import { BoxProps } from "@mui/system";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { Header } from "../components";
import { ProjectType } from "../@types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { getProjects } from "../db";
import { styled } from "@mui/material/styles";
import styles from "../styles/pages/home.module.scss";
import { useNavigate } from "react-router-dom";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "20px",
  },
});

function Home() {
  const [data, setData] = useState<ProjectType[]>([]);
  const [favourites, setFavourites] = useState<ProjectType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<1 | -1>(1);

  useEffect(() => {
    const temp = getProjects();
    setData(temp);
    setFavourites(temp.filter((e) => e.favourite));
  }, []);

  return (
    <div style={{ background: "#F8F9FD" }}>
      <Header />
      <Container
        sx={{
          padding: "50px 0px !important",
          maxWidth: {
            xs: "95%",
            sm: "95%",
            md: "95%",
            xl: "xl",
          },
        }}
        className="container"
      >
        <SearchBarWithFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          setData={setData}
          setFavourites={setFavourites}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            marginBottom: "20px",
          }}
          gap={5}
          alignItems={"center"}
        />
        <HomeTabs
          setFavourites={setFavourites}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          data={data.filter((e) => {
            if (search === "") {
              return true;
            } else {
              return (
                e.title.toLowerCase().includes(search.toLowerCase()) ||
                e.description.toLowerCase().includes(search.toLowerCase())
              );
            }
          })}
          setData={setData}
          favourites={favourites}
        />
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
          <div>{children}</div>
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
type HomeTabsProps = {
  data: ProjectType[];
  favourites: ProjectType[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  filter: filterType;
  setFilter: React.Dispatch<React.SetStateAction<filterType>>;
  setData: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  setFavourites: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};
function HomeTabs({
  data,
  favourites,
  search,
  filter,
  setFilter,
  setSearch,
  setData,
  setFavourites,
}: HomeTabsProps) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
        <SearchBarWithFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          setData={setData}
          setFavourites={setFavourites}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
          gap={5}
          alignItems={"center"}
        />
      </Box>
      <TabPanel value={value} index={0}>
        <div className={styles.cards_grid}>
          {data.length > 0 ? (
            data.map((d, _) => <Card {...d} key={d.id} />)
          ) : (
            <Box>
              <h1 style={{ color: "gray" }}>No Hackathon data</h1>
              <CustomButton
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate("/add");
                }}
              >
                Add from here
              </CustomButton>
            </Box>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.cards_grid}>
          {favourites.length > 0 ? (
            favourites.map((d, _) => <Card {...d} key={d.id} />)
          ) : (
            <Box>
              <h1 style={{ color: "gray" }}>No Favourite data</h1>
            </Box>
          )}
        </div>
      </TabPanel>
    </Box>
  );
}

interface SearchBarWithFilterProps extends BoxProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  filter: filterType;
  setFilter: React.Dispatch<React.SetStateAction<filterType>>;
  setData: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  setFavourites: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}
const SearchBarWithFilter = ({
  filter,
  search,
  setFilter,
  setSearch,
  setData,
  setFavourites,
  ...props
}: SearchBarWithFilterProps) => {
  return (
    <Box {...props}>
      <CustomTextField
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        value={search}
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
          minWidth: "120px",
        }}
        size="small"
        id="demo-simple-select"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value as filterType);
          setData((prev) => {
            return prev.sort((a, b) => {
              if (filter === 1) {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              } else {
                return (
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
                );
              }
            });
          });
          setFavourites((prev) => {
            return prev.sort((a, b) => {
              if (filter === 1) {
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              } else {
                return (
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
                );
              }
            });
          });
        }}
      >
        <MenuItem value={1}>Newest</MenuItem>
        <MenuItem value={-1}>Oldest</MenuItem>
      </Select>
    </Box>
  );
};
