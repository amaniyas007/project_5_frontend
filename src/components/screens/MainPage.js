import { React, useEffect, useState } from "react";
import Header from "../includes/Header";
import styled from "styled-components";
import { quizConfig } from "../../axiosConfig";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { Context } from "../context/store";

function MainPage() {
    const [selectedOption, setSelectedOption] = useState("");
    const [firstName, setFirstName] = useState("");
    // console.log(selectedOption, "selectedOption");
    const [data, setData] = useState([]);
    // console.log(data, "data");
    const [pk, setpk] = useState("");
    const [count, setCount] = useState(0);
    const [mark, setMark] = useState(0);
    // const { state } = useContext(Context);
    const { category } = useParams();
    // console.log(state.user_details.access_token, "state");
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    // console.log(userDetails, "userDetails");
    // console.log(selectedOption, "selectedOption");
    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };
    const handleSubmit = () => {
        const formdata = new FormData();
        let access_token = userDetails.access_token;

        formdata.append("choice", selectedOption);
        quizConfig
            .post(`questions/submit-answer/${pk}/`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + access_token,
                },
            })
            .then(function (response) {
                setCount(count + 1);
                if (response.data.score === 1) {
                    setMark(mark + 1);
                }
                setSelectedOption("");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        let access_token = userDetails.access_token;
        const handlefetch = () => {
            quizConfig
                .get("/questions/", {
                    params: {
                        category: category,
                    },

                    headers: {
                        Authorization: "Bearer " + access_token,
                    },
                })
                .then(function (response) {
                    setData(response.data.data);
                    setFirstName(response.data.first_name);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        handlefetch();
    }, []);

    return (
        <>
            <Helmet>
                <title>Quiz App</title>
            </Helmet>
            <Header />
            <MainContainer>
                <QuestionContainer>
                    {data?.map((e, index) => (
                        <div key={index}>
                            {count === index && (
                                <div key={index}>
                                    {console.log("index", index)}
                                    <QuestionHeading>Questions</QuestionHeading>
                                    <QuizContainer>
                                        <QuizNumber>{index + 1}. </QuizNumber>
                                        <Questions>{e.question}</Questions>
                                    </QuizContainer>
                                    <OptionsContainer>
                                        <form onSubmit={handleSubmit}>
                                            <RadioGroup>
                                                <RadioButton
                                                    style={{
                                                        backgroundColor:
                                                            selectedOption ===
                                                                e.choice_1 &&
                                                            "#25d4dc",
                                                    }}
                                                    onClick={() => {
                                                        handleOptionChange(
                                                            e.choice_1
                                                        );
                                                        setpk(e.id);
                                                    }}
                                                >
                                                    {e.choice_1}
                                                    <Round></Round>
                                                </RadioButton>
                                                <RadioButton
                                                    onClick={() => {
                                                        handleOptionChange(
                                                            e.choice_2
                                                        );
                                                        setpk(e.id);
                                                    }}
                                                    style={{
                                                        backgroundColor:
                                                            selectedOption ===
                                                                e.choice_2 &&
                                                            "#25d4dc",
                                                    }}
                                                >
                                                    {e.choice_2}
                                                    <Round></Round>
                                                </RadioButton>
                                                <RadioButton
                                                    onClick={() => {
                                                        handleOptionChange(
                                                            e.choice_3
                                                        );
                                                        setpk(e.id);
                                                    }}
                                                    style={{
                                                        backgroundColor:
                                                            selectedOption ===
                                                                e.choice_3 &&
                                                            "#25d4dc",
                                                    }}
                                                >
                                                    {e.choice_3}
                                                    <Round></Round>
                                                </RadioButton>
                                                <RadioButton
                                                    onClick={() => {
                                                        handleOptionChange(
                                                            e.choice_4
                                                        );
                                                        setpk(e.id);
                                                    }}
                                                    style={{
                                                        backgroundColor:
                                                            selectedOption ===
                                                                e.choice_4 &&
                                                            "#25d4dc",
                                                    }}
                                                >
                                                    {e.choice_4}
                                                    <Round></Round>
                                                </RadioButton>
                                            </RadioGroup>
                                            <p>Hint : {e.hint}</p>

                                            <SubmitBtn
                                                type="submit"
                                                onClick={(e) => {
                                                    selectedOption &&
                                                        handleSubmit(e);
                                                }}
                                            >
                                                Submit
                                            </SubmitBtn>
                                        </form>
                                    </OptionsContainer>
                                </div>
                            )}
                        </div>
                    ))}
                    {data?.length === count && (
                        <ResetBtn onClick={() => setMark(0)}>
                            Reset Score
                        </ResetBtn>
                    )}
                    {console.log(data)}
                </QuestionContainer>
                <TopScorer>
                    <ScoreHeading>
                        {firstName && <div>{firstName}</div>}
                    </ScoreHeading>
                    <ScoreSubHeading>Score: {mark}</ScoreSubHeading>
                </TopScorer>
            </MainContainer>
        </>
    );
}

export default MainPage;

const MainContainer = styled.div`
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
`;
const QuestionContainer = styled.div`
    width: 45%;
    border: 1px solid black;
    padding: 10px;
    border-radius: 5px;
`;
const TopScorer = styled.div`
    width: 45%;
    border: 1px solid black;
    padding: 10px 70px;
    height: 190px;
    border-radius: 5px;
`;
const ScoreHeading = styled.h1`
    font-size: 20px;
    text-align: center;
    margin-bottom: 40px;
`;
const QuestionHeading = styled.h1`
    font-size: 20px;
    text-align: center;
`;
const QuizContainer = styled.div`
    display: flex;
`;
const QuizNumber = styled.h3``;
const Questions = styled.h3``;
const OptionsContainer = styled.div`
    padding: 10px 50px;
    margin-top: 20px;
`;
const ScoreSubHeading = styled.h2``;
const SubmitBtn = styled.div`
    display: inline-block;
    background: #046bf6;
    padding: 10px 40px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
    color: #fff;
    border: none;
    outline: none;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;
const ResetBtn = styled.div`
    display: block;
    background: #046bf6;
    padding: 10px 40px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
    color: #fff;
    border: none;
    outline: none;
    text-align: center;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;
const RadioGroup = styled.div``;
const RadioButton = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #000;
    margin-bottom: 20px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
        color: blue;
    }
`;
const Round = styled.div``;
