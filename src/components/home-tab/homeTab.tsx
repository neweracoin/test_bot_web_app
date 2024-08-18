import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/modules/navigation.scss'; // Navigation module

// import required modules
import { Pagination } from 'swiper/modules';
import { claimTask, getTasks, getUser } from "../../api";
import logoBig from "../../assets/img/logobig.png";
import logoSm from "../../assets/img/logosm.svg";

import Footer from "../footer";
import { useEffect, useState } from "react";


const HomeTab = () => {




    const [totalPoints, setTotalPoints] = useState(Number(sessionStorage.getItem("totalPoints")));
    const [referees, setReferees] = useState<any[]>(JSON.parse(sessionStorage.getItem("referees") || "[]"));
    const [taskList, setTasks] = useState<any[]>(JSON.parse(sessionStorage.getItem("claimedTasks") || "[]"));
    const [isLoading, setIsLoading] = useState<Boolean>(false)


    const tasks: { id: number; name: string; reward: number; to: string, btnText:string, icon:any }[] = [
        {
            id: 1,
            name: "Join Channel",
            reward: 150,
            to: "https://t.me/aidogs_community",
            btnText:"Join",
            icon:<svg xmlns="http://www.w3.org/2000/svg"  fill="#FFFFFF" width="20px" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>

        },
        {
            id: 2,
            name: "Follow Twitter",
            reward: 150,
            to: "https://twitter.com/FitcoinEarn",
            btnText:"Follow",
            icon:<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" width="20px" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>


        }
    ];




    const handleFocus = () => {
        let taskToClaim = JSON.parse(sessionStorage.getItem("taskToClaim") || "{}");

        //     const testId: Number = 6489531324;
        //     const testCid = 1;
        //     const testCpoint = 40000
        //     if (!!taskToClaim.taskId) {
        //     claimTask(Number(testId),  taskToClaim.taskId, taskToClaim.points).then(async () => {
        //         await getUser(Number(testId)).then((res) => {
        //             if (res.status == 200) {
        //                 console.log("res","points", res)
        //                 sessionStorage.setItem("points", res.data.points);
        //             }
        //         });
        //         await getTasks(Number(testId)).then((res) => {
        //             if (res.status == 200) {
        //                 console.log("getTask", res.data)
        //                 setTasks(res.data);
        //             }

        //         });
        //         sessionStorage.removeItem("taskToClaim");
        //     });
        // }
        if (!!taskToClaim.taskId) {
            claimTask(Number(sessionStorage.getItem("tid")), taskToClaim.taskId, taskToClaim.points).then(async () => {
                await getUser(Number(sessionStorage.getItem("tid"))).then((res) => {
                    if (res.status == 200) {
                        sessionStorage.setItem("totalPoints", res.data.totalPoints);
                        sessionStorage.setItem("referees", JSON.stringify(res.data.referees));
                        setTotalPoints(res.data.totalPoints)
                        setReferees(res.data.referees)

                    }
                });
                await getTasks(Number(sessionStorage.getItem("tid"))).then((res) => {
                    if (res.status == 200) {
                        setTasks(res.data);
                    }
                });
                sessionStorage.removeItem("taskToClaim");
            });
        }

    
    };

    useEffect(() => {
       

        getTasks(Number(sessionStorage.getItem("tid"))).then((res) => {
            if (res.status == 200) {
                sessionStorage.setItem("claimedTasks", JSON.stringify(res.data));
              
                setTasks(res.data);
            }
        });

        getUser(Number(sessionStorage.getItem("tid"))).then((res) => {
            if (res.status == 200) {
                sessionStorage.setItem("totalPoints", res.data.totalPoints);
                sessionStorage.setItem("referees", JSON.stringify(res.data.referees));
                setTotalPoints(res.data.totalPoints)
                setReferees(res.data.referees)

            }
        });

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);


    const claim = (e: React.MouseEvent, taskId: number, points: number) => {
        e.preventDefault();
        setIsLoading(true)
        sessionStorage.setItem("taskToClaim", JSON.stringify({ taskId, points }));
        let task = tasks.find((t: any) => t.id === taskId);
        let taskLink = task ? task.to : "";
        if (taskLink) {
            window.open(taskLink, "_blank");
        }
    };
    const openTg = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://t.me/aidogs_community", "_blank");
    
    };
    const openTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://t.me/aidogs_community", "_blank");
    
    };



    // https://t.me/aidogs_community


    return (
        <div className="flex flex-col  items-center w-full justify-end  h-[100%] overflow-hidden">
            <div className="flex flex-col  w-full overflow-y-auto h-[100%]">
                <div className="flex flex-col items-center pt-5 px-10 w-full flex-1">

                    <div className=" w-[50%] small-mobile:w-[32%] mobile:w-[36%]">
                        <img className="w-full" src={logoBig} alt="" />
                    </div>
                </div>
                <div className="flex flex-col rounded-lg bg-white/20 py-5 my-4  justify-center align-center m-auto items-center w-80">



                    <p className="text-[#FFFFFF] text-4xl font-OpenSans font-light">{totalPoints.toLocaleString()}</p>
                    <p className="text-[#A6A6A6] text-2xl font-OpenSans font-light">$AIDOGS</p>


                </div>
                <div>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={25}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                       
                        <SwiperSlide>
                            <div className='flex flex-col rounded-lg justify-center align-center items-center text-white bg-white/15 py-3'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <img className="w-full" src={logoSm} alt="" />

                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'> JOIN OUR TG</p>
                                    <p className='text-xs'> Stay updated</p>
                                </div>
                                <div className="flex flex-col rounded-lg bg-white/20  justify-center align-center m-auto items-center">


                                    <button
                                        className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]"
                                        onClick={(e) => openTg(e)}

                                    >
                                        Join
                                    </button>


                                </div>

                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex flex-col rounded-lg justify-center align-center items-center text-white bg-white/15 py-3'>
                                <div className=" w-[50%] small-mobile:w-[20%] mobile:w-[25%]">
                                    <img className="w-full" src={logoSm} alt="" />

                                </div>
                                <div className='flex flex-col justify-center align-center items-center py-4'>
                                    <p className='text-sm'> FOLLOW US ON X</p>
                                    <p className='text-xs'> Stay updated</p>
                                </div>
                                <div className="flex flex-col rounded-lg bg-white/20  justify-center align-center m-auto items-center">


                                    <button
                                        className="bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]"
                                        onClick={(e) => openTwitter(e)}

                                    >
                                        Follow
                                    </button>
                                </div>

                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>


                <div className="w-full  flex flex-col pt-7 px-4 relative z-10">
                    <p className='text-white text-xl pb-5'>Tasks</p>
                    {tasks.map((task) => {
                        let isTaskClaimed = taskList.find((t) => t.taskId == task.id);
                        let taskToClaim = JSON.parse(sessionStorage.getItem("taskToClaim") || "{}");

                        return (

                            <div key={task.id} className='flex justify-between py-2 w-full items-center'>
                                <div className='flex items-center'>
                                    <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                        {/* <img className="w-full" src={logoSm} alt="" /> */}
                                        {task.icon}
                                    </div>
                                    <div className='flex flex-col pl-5'>
                                        <p className='text-white text-bold'>{task.name}</p>
                                        <span className='text-[#A6A6A6]'>+{task.reward.toLocaleString()} $AIDOGS</span>
                                    </div>
                                </div>
                                <div className="">


                                    <button
                                        className={`bg-white text-xs font-OpenSans text-[rgba(0,0,0)] rounded-lg px-4 py-2  rounded-[1px]  ${isTaskClaimed && "opacity-50"
                                            }`}
                                        onClick={(e) => claim(e, task.id, Number(task.reward))}
                                        disabled={isTaskClaimed}
                                    >

                                        {isTaskClaimed ? "Done" : <>{isLoading && task.id == taskToClaim.taskId ? <>
                                            <span className="loader"></span>
                                        </> : <>{task.btnText}</>}</>}
                                    </button>
                                </div>
                            </div>


                        );
                    })}
                    <div className='flex justify-between py-2 w-full items-center'>
                        <div className='flex items-center'>
                            <div className=" w-[50%] small-mobile:w-[5%] mobile:w-[8%]">
                                <img className="w-full" src={logoSm} alt="" />

                            </div>
                            <div className='flex flex-col pl-3'>
                                <p className='text-white text-bold'>Your Referrals</p>
                                <span className='text-[#A6A6A6]'></span>
                            </div>
                        </div>
                        <div className="">


                            <p className='text-white pr-5'>
                                {referees?.length || 0}
                            </p>


                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomeTab;
