'use client';

import * as z from "zod"
import axios from 'axios'
import { Heading } from "@/components/Heading";
import { Code, Divide, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import {formSchema} from "./constants"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import ReactMarkdown from "react-markdown"
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/useProModal";

interface pageProps {

}

const Page: React.FC<pageProps> = ({}) => {
    const router = useRouter();
    const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            const userMessage : ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]
            const response = await axios.post("/api/code", {messages: newMessages})
            setMessages((current)=> [...current,  response.data, userMessage,])
            form.reset()
        } catch (error : any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
              } else {
                console.log(error);
                toast.error("Something went wrong.");
              }
        }
        finally{
            router.refresh()
        }
    }

  return (
    <>
    <div>
        <Heading title="Code Generation" description="Generate code using descriptive text" icon={Code} 
        iconColor = "text-green-700"
        bgColor="bg-green-700/10"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                        <FormField name="prompt" render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Simple toggle button using react hooks" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}/>
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {
                    isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader/>
                        </div>
                    )
                }
                {messages.length==0 && !isLoading && (
                    <Empty label="Start a convo by asking a question"/>
                    
                    )}
                <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message)=>(
                            <div key={message.content} className={cn(
                                "p-8 w-full flex items-start gap-x-8 rounded-lg", message.role ==='user' ? "bg-white border border-black/10" : "bg-muted"
                            )}>
                                {message.role === 'user' ? <UserAvatar/> : <BotAvatar/>}
                                <ReactMarkdown className={"bg-black/10 rounded-lg p-1"} components={{pre:
                                ({node, ...props}) =>(
                                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                        <pre {...props}/>
                                    </div>
                                ),
                                code: ({node,...props})=>(
                                    <code className="bg-black/10 rounded-lg p-1" {...props}/>
                                )
                                }}>
                                   
                                        {message.content || ""}
                 
                                </ReactMarkdown>
                                
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Page;