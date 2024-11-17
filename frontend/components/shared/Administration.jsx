import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Vote, History } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Administration = () => {
    return (
        <>
            <div className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1: Créer un vote */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className="w-12 h-12 bg-[#f45970]/10 rounded-full flex items-center justify-center">
                                <PlusCircle className="w-6 h-6 text-[#f45970]" />
                            </div>
                            <CardTitle className="text-xl flex items-center justify-center">Voting proposals</CardTitle>
                            <CardDescription>
                                Candidates list
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div>

                                <span className="p-4 mb-2 flex items-center justify-center">
                                    <Avatar className="mr-2 ">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    Trump
                                </span>
                                <span className="p-4 mb-2 flex items-center justify-center">
                                    <Avatar className="mr-2 ">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    Obama
                                </span>
                                <span className="p-4 mb-2 flex items-center justify-center">
                                    <Avatar className="mr-2 ">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    Eminem
                                </span>
                                <span className="p-4 mb-2 flex items-center justify-center">
                                    <Avatar className="mr-2 ">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    Snoop Dog
                                </span>
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
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </span>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Card 3: Historique */}
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
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    Add voter
                                </Button>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    Tally votes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Administration