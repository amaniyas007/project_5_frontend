import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { Context } from "../context/store";

function Header() {
    const navigate = useNavigate();
    // const { state:{  user_details} } = useContext(Context);
    // console.log(  user_details,"  user_details");
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <>
            <HeaderContainer>
                <Link to="/">
                    <DivLeft>
                        <LogoImg
                            src={require("../../assets/images/logo.png")}
                        />
                    </DivLeft>
                </Link>
                {userDetails.is_verified ? (
                    <>
                        {" "}
                        <Button onClick={() => handleLogout()}>
                            <Link to="/login">Logout</Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button>
                            {" "}
                            <Link to="/login">Login</Link>
                        </Button>
                    </>
                )}
            </HeaderContainer>
        </>
    );
}

export default Header;

const HeaderContainer = styled.div`
    height: 120px;
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
`;
const DivLeft = styled.div`
    width: 120px;
`;
const LogoImg = styled.img`
    width: 100%;
    display: block;
`;
const Button = styled.div`
    background: #046bf6;
    padding: 10px 40px;
    border-radius: 5px;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;
const LoginText = styled.h2`
    font-size: 20px;
    color: #fff;
`;
