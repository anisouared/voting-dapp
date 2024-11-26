'use client'
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
import { PlusCircle, Vote, History } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractAbi, contractAddress, workflowStatus } from '@/constants';
import NotAuthorized from "@/components/shared/NotAuthorized"
import { useEffect, useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { publicClient } from "@/utils/client"
import { toast } from "@/hooks/use-toast"
import { parseAbiItem } from "viem";


const Administration = () => {
    const { address } = useAccount();
    const [voterAddress, setVoterAddress] = useState('');
    const [currentWorkflowStatus, setCurrentWorkflowStatus] = useState(-1);
    const [selectedWorkflowStatus, setSelectedWorkflowStatus] = useState(0);
    const [registredVotersEvents, setRegistredVotersEvents] = useState([]);


    const handleWorkflowStatusChange = async (value) => {
        setSelectedWorkflowStatus(value);
    }

    const ChangeWorkFlowStatus = async () => {
        await setNewWorkflowStatus();
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


    const { data: worflowHash, error: workflowError, isPending: workflowIsPending, writeContract: writeWorkflowContract } = useWriteContract({});
    const {
        isLoading: isWorkflowConfirming,
        isSuccess: isWorkflowSuccess,
        error: workflowConfirmationError
    } = useWaitForTransactionReceipt({ hash: worflowHash });
    const setNewWorkflowStatus = async () => {
        writeWorkflowContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: workflowStatus[selectedWorkflowStatus].function,
            args: []
        })
    }

    const { data: addVoterHash, error: addVoterError, isPending: addVoterIsPending, writeContract: writeAddVoterContract } = useWriteContract({});
    const {
        isLoading: isAddVoterConfirming,
        isSuccess: isAddVoterSuccess,
        error: addVoterConfirmationError
    } = useWaitForTransactionReceipt({ hash: addVoterHash });
    const setAddVoter = async () => {
        writeAddVoterContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'addVoter',
            args: [voterAddress]
        })
    }

    const { data: tallyVotesHash, error: tallyVotesError, isPending: tallyVotesIsPending, writeContract: writeTallyVotesContract } = useWriteContract({});
    const {
        isLoading: isTallyVotesConfirming,
        isSuccess: isTallyVotesSuccess,
        error: tallyVotesConfirmationError
    } = useWaitForTransactionReceipt({ hash: tallyVotesHash });
    const callTallyVotes = async () => {
        writeTallyVotesContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'tallyVotes'
        })
    }


    const getVoterRegistredEvents = async () => {
        const voterRegistredLogs = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem('event VoterRegistered(address voterAddress)'),
            fromBlock: 0n,
            toBlock: 'latest'
        })

        voterRegistredLogs.forEach(element => {

        });

        setRegistredVotersEvents(voterRegistredLogs.map(log => ({
            voterAddress: log.args.voterAddress.toString(),
        })))
    }


    useEffect(() => {
        if (isWorkflowSuccess) {
            setCurrentWorkflowStatus(currentWorkflowStatus + 1)
            setSelectedWorkflowStatus(selectedWorkflowStatus + 1);
        }
    }, [isWorkflowSuccess])

    useEffect(() => {
        if (isAddVoterSuccess) {
            toast({
                title: "Voter ADDED",
                className: "bg-lime-200"
            })
            getVoterRegistredEvents();
        }
    }, [isAddVoterSuccess])

    useEffect(() => {
        if (workflowStatusGet !== undefined) {
            setCurrentWorkflowStatus(Number(workflowStatusGet));
            setSelectedWorkflowStatus(Number(workflowStatusGet));
            getVoterRegistredEvents()
        }
    }, [workflowStatusGet])


    return (
        <>
            {owner == address ? (
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1: Créer un vote */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="w-12 h-12 bg-[#f45970]/10 rounded-full flex items-center justify-center">
                                    <PlusCircle className="w-6 h-6 text-[#f45970]" />
                                </div>
                                <CardTitle className="text-xl flex items-center justify-center">Voters</CardTitle>
                                <CardDescription>
                                    Voters list
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="space-y-6">
                                    {/* Liste des Voters avec scroll */}
                                    <div className="border rounded-lg">
                                        <div className="font-medium p-3 bg-gray-50 border-b">
                                            Registered Voters
                                        </div>
                                        <div className="max-h-[200px] overflow-y-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Voters</TableHead>
                                                        <TableHead>Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {/* Exemple de données répétées pour démontrer le scroll */}
                                                    {registredVotersEvents.map((_, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="flex items-center gap-2">
                                                                {_.voterAddress}
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                                    Registered
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

                        {/* Card 2: Votes actifs */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Vote className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="text-xl flex items-center justify-center">Workflow status</CardTitle>
                                <CardDescription>
                                    Manage application workflow
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <span className="flex w-full">
                                    <Select value={selectedWorkflowStatus} onValueChange={handleWorkflowStatusChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select next workflow status ..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {workflowStatus.map((status) => (
                                                <SelectItem key={status.value} value={status.value} disabled={status.value <= currentWorkflowStatus}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </span>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={ChangeWorkFlowStatus} disabled={selectedWorkflowStatus == 0 ||
                                    currentWorkflowStatus == selectedWorkflowStatus ||
                                    currentWorkflowStatus == workflowStatus.length - 1}>
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Card 3: Actions */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <History className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle className="text-xl flex items-center justify-center">Actions</CardTitle>
                                <CardDescription>
                                    Actions that can be carried out by the DAPP administration
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="space-y-4 w-full">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={currentWorkflowStatus != 0}>
                                                Adding voter
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-semibold">Add New Voter</DialogTitle>
                                                <DialogDescription>
                                                    Enter the wallet address of the voter you want to add
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <Input
                                                        id="voter-address"
                                                        placeholder="0x..."
                                                        className="w-full"
                                                        value={voterAddress}
                                                        onChange={(e) => setVoterAddress(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={addVoterIsPending} onClick={setAddVoter}>
                                                    Add Voter
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled={currentWorkflowStatus != 4}>
                                                Tally votes
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle className="text-xl font-semibold">Tally Votes</DialogTitle>
                                                <DialogDescription>
                                                    Confirm that you want to tally the votes
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <p className="text-sm text-gray-600">
                                                    This action will end the voting session and calculate the final results.
                                                    This action cannot be undone.
                                                </p>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" onClick={callTallyVotes}>
                                                    Confirm Tally
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div >
            ) :
                <NotAuthorized />
            }
        </>
    )
}

export default Administration