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
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ListChecks, Vote, Trophy, PlusCircle, History } from "lucide-react"
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import Event from "./Event";
import { contractAbi, contractAddress, workflowStatus } from '@/constants';
import { toast } from "@/hooks/use-toast"
import { publicClient } from "@/utils/client"
import { parseAbiItem } from "viem";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import AdminWelcome from "@/components/shared/AdminWelcome"


const Voting = () => {
    const { address, isConnected } = useAccount();
    const [proposal, setProposal] = useState('');
    const [proposals, setProposals] = useState([]);
    const [selectedProposalId, setSelectedProposalId] = useState(0);
    const [winningProposalID, setWinningProposalID] = useState(0);


    const handleProposalChange = async (value) => {
        setSelectedProposalId(value);
    }

    // Ajouter cette fonction après getVoterRegistredEvents
    const getProposalsIDs = async () => {
        try {
            const proposalRegisteredLogs = await publicClient.getLogs({
                address: contractAddress,
                event: parseAbiItem('event ProposalRegistered(uint proposalId)'),
                fromBlock: 0n,
                toBlock: 'latest'
            });

            const proposalsIds = proposalRegisteredLogs.map(log => (
                Number(log.args.proposalId)
            ));

            return proposalsIds;
        } catch (error) {
            toast({
                title: "Error fetching proposals",
                description: "Failed to load proposals",
                variant: "destructive",
            });
        }
    };

    // Fonction pour récupérer les détails d'une proposition
    const getProposalDetails = async (proposalId) => {
        try {
            const data = await publicClient.readContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'getOneProposal',
                args: [proposalId],
                account: address
            });

            return { id: proposalId, description: data.description, voteCount: data.voteCount };
        } catch (error) {
            console.error(`Error fetching proposal ${proposalId}:`, error);
            return { id: proposalId, description: 'Error loading proposal', voteCount: 0 };
        }
    };

    const getAllProposalsDetails = async () => {
        const proposalsIds = await getProposalsIDs();

        const promises = proposalsIds.map(proposal => getProposalDetails(proposal))

        const results = await Promise.all(promises);
        setProposals(results);
    }


    const { data: owner, error: errorGetOwner, isPending: isPendingGetOwner, refetch: refetchGetOwner } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'owner',
        account: address
    })

    const { data: workflowStatusGet, error: errorGetWorkflowStatus, isPending: isPendingGetWorkflowStatus, refetch: refetchGetWorkflowStatus } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'workflowStatus',
        account: address
    })

    const { data: winningProposalIDGet, error: errorGetWinningProposalIDStatus, isPending: isPendingGetWinningProposalID, refetch: refetchWinningProposalID } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'winningProposalID',
        account: address
    })


    const { data: addProposalHash, error: addProposalError, isPending: addProposalIsPending, writeContract: writeAddProposalContract } = useWriteContract({});
    const {
        isLoading: isAddProposalConfirming,
        isSuccess: isAddProposalSuccess,
        error: addProposalConfirmationError
    } = useWaitForTransactionReceipt({ hash: addProposalHash });
    const setAddProposal = async () => {
        writeAddProposalContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'addProposal',
            args: [proposal]
        })
    }

    const { data: setVoteHash, error: setVoteError, isPending: setVoteIsPending, writeContract: writeSetVoteContract } = useWriteContract({});
    const {
        isLoading: isSetVoteConfirming,
        isSuccess: isSetVoteSuccess,
        error: setVoteConfirmationError
    } = useWaitForTransactionReceipt({ hash: setVoteHash });
    const setVote = async () => {
        writeSetVoteContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'setVote',
            args: [selectedProposalId]
        })
    }


    useEffect(() => {
        if (isAddProposalSuccess) {
            toast({
                title: "proposal ADDED",
                className: "bg-lime-200"
            })
            getAllProposalsDetails()
        }
    }, [isAddProposalSuccess])

    useEffect(() => {
        if (winningProposalIDGet != 0) {
            setWinningProposalID(Number(winningProposalIDGet))
        }
    }, [winningProposalIDGet])

    useEffect(() => {
        if (address != owner) {
            getAllProposalsDetails()
        }
    }, [isSetVoteSuccess])

    useEffect(() => {
        if (address != owner) {
            getAllProposalsDetails()
        }
    }, [isConnected]);

    return (
        <>
            {address != owner ? (
                <div className="flex-1 p-4 md:p-6 lg:p-8 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1: Actions */}
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
                            <CardContent className="flex-1 flex items-end pb-8">
                                <div className="space-y-4 w-full">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base" disabled={workflowStatusGet != 1 || addProposalIsPending}>
                                                Add proposal
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-semibold">Add New Proposal</DialogTitle>
                                                <DialogDescription>
                                                    Enter your proposal description below
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <Input
                                                        id="proposal"
                                                        placeholder="Enter your proposal..."
                                                        className="w-full"
                                                        value={proposal}
                                                        onChange={(e) => setProposal(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" onClick={setAddProposal}>
                                                    Submit Proposal
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base" disabled={workflowStatusGet != 3}>
                                                Vote
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-semibold">Cast Your Vote</DialogTitle>
                                                <DialogDescription>
                                                    Select a proposal to vote for
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <Select value={selectedProposalId} onValueChange={handleProposalChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a proposal" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {proposals.map((proposal) => (
                                                            <SelectItem key={proposal.id} value={proposal.id}>{proposal.description}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" onClick={setVote}>
                                                    Submit Vote
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 2: Final Result */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="w-12 h-12 bg-[#f45970]/10 rounded-full flex items-center justify-center">
                                    <PlusCircle className="w-6 h-6 text-[#f45970]" />
                                </div>
                                <CardTitle className="text-xl flex items-center justify-center">Proposals</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="space-y-6">
                                    {/* Liste des Proposals avec scroll */}
                                    <div className="border rounded-lg">
                                        <div className="font-medium p-3 bg-gray-50 border-b">
                                            Proposals List
                                        </div>
                                        <div className="max-h-[200px] overflow-y-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Proposal</TableHead>
                                                        <TableHead>Votes</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {proposals.map((_, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="flex items-center gap-2">
                                                                {_.description}
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                                                                    {_.voteCount} votes
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 3: Listes des proposals */}
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
                                    <div className="text-3xl font-bold text-yellow-600">{winningProposalID != 0 ? proposals.find(proposal => proposal.id == winningProposalID)?.description : <span>-------</span>}</div>
                                    {winningProposalID != 0 && <div className="text-base text-gray-600">
                                        Is the winner of this voting session
                                    </div>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : <AdminWelcome />}
        </>
    )
}

export default Voting