import styled from "@emotion/styled";
// import { Box, Container, Typography } from "@mui/material";
import {
  Box,
  Card,
  Typography,
  CardHeader,
  Avatar,
  CardContent,
  Stack,
  Divider,
  Button,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import Post from "../../component/post/post";
import { Link } from "react-router-dom";
import moment from "moment";
import Reaction from "../../component/ventReaction/reaction";
import React, { useEffect, useState } from "react";
import Nav from "../../component/nav/nav";
import Posts from "../../component/posts/posts";
import RightBar from "../../component/rightBar/rightBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllVents } from "../../feature/ventSlice";

const Home = ({ type }) => {
  // const { posts, isLoading } = useSelector((state) => state.vent);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  // console.log(posts, posts.length);
  console.log(posts, posts.length);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const visibleHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollHeight = scrollY + visibleHeight;

    if ((!isLoading && scrollHeight) + 5 >= totalHeight * 0.9) {
      setPage((pre) => pre + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/vent?page=${page}`
    );
    const { data } = await response.json();
    if (response.ok) {
      setPosts((prevItems) => {
        if (page === 1) {
          return [...data];
        }
        return [...prevItems, ...data];
      });
    }

    setLoading(false);
  };

  const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });

  return (
    <StyledBox>
      <Box flex={"1.5"}>
        <Nav />
        <Typography variant="h6" color="initial">
          {posts.length}
        </Typography>
        <Posts posts={posts} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {isLoading && <CircularProgress size={100} />}
        </Box>
      </Box>

      {/* <Posts saved={true} posts={posts} isLoading={isLoading} /> */}

      <Box flex={"1"}>
        <RightBar />
      </Box>
    </StyledBox>
  );
};

export default Home;
