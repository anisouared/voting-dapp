'use client'

import { useState, useEffect } from "react";
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ListChecks, Vote, Trophy } from "lucide-react" // Changé History pour Trophy
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import Event from "./Event";


const Voting = () => {
    const [events, setEvents] = useState([]);
    const { address } = useAccount();

    const getEvents = async () => {
        setEvents([
            { oldValue: 1, newValue: 55 },
            { oldValue: 55, newValue: 76 },
            { oldValue: 76, newValue: 11 }])
    }

    useEffect(() => {
        const getAllEvents = async () => {
            if (address != 'undefined') {
                getEvents();
            }
        }
        getAllEvents();
    }, [])

    return (
        <div className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="grid gap-8">
                {/* Première ligne: 2 grandes cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Card 1: Events */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#f45970] to-[#f45970]/60 rounded-2xl flex items-center justify-center">
                                    <ListChecks className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl mb-1">Events</CardTitle>
                                    <CardDescription className="text-base">Total number of events: 156</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {events.length > 0 && events.map((event) => {
                                return (
                                    <Event event={event} key={crypto.randomUUID()} />
                                )
                            })}
                        </CardContent>
                    </Card>

                    {/* Card 2: Actions */}
                    <Card className="flex flex-col">
                        <CardHeader className="pb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center">
                                    <Vote className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl mb-1">Actions</CardTitle>
                                    <CardDescription className="text-base">Actions that voters can take</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-end pb-12">
                            <div className="space-y-4 w-full">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base">
                                    Add proposal
                                </Button>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base">
                                    Vote
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Deuxième ligne: 1 card centrée */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-start-2">
                        <Card className="flex flex-col">
                            <CardHeader className="pb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-2xl flex items-center justify-center">
                                        <Trophy className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl mb-1">Final Result</CardTitle>
                                        <CardDescription className="text-base">Latest voting result</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 pt-4">
                                <div className="text-center space-y-4 p-6 bg-gray-50 rounded-lg">
                                    <div className="text-3xl font-bold text-yellow-600">Trump</div>
                                    <div className="text-base text-gray-600">
                                        Is the winner of this voting session
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Voting