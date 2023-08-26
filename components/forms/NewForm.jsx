"use client"
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, usePathname } from 'next/navigation'
import { useForm } from "react-hook-form"
import { RiGlobalLine, RiGitRepositoryPrivateLine } from "react-icons/ri";
import { ReloadIcon } from "@radix-ui/react-icons"
import { languages } from "@/constants/languages"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { firestore } from "@/firebase/firestore"

const NewForm = ( {user} ) => {
  const [loading, setLoading]= useState(false)
  const router= useRouter()
  const pathname= usePathname()
  const displayName= typeof(user?.name) !== 'undefined' ? user?.name : "Guest"
  const formSchema = z.object({
    author: z.string().default(displayName),
    repo: z.string({
      required_error: "Repo name cannot be empty"
    }).min(4, {
      message: "repo name must be atleast 4 characters"
    }).max(15, {
      message: "repo name must be utmost 15 characters"
    }),
    description: z.string(),
    language: z.number({
      required_error: "Please select a language"
    }),
    status: z.enum(["public", "private"], {
      required_error: "You need to select either of the two.",
    }),
  })

  const form= useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repo: "",
      description: "",
    }
  })

  const onSubmit= async (values) =>{
    setLoading(true)
    const result= await firestore.createRepo(user, values)
    if (result == 1){
      router.push(`${pathname}/editor?repo=${values.repo}&lang=${values.language}`)
      setLoading(false)
    } else {
      console.log("Repo name already exists")
    }
    
  }

  return (
    <>
    <AlertDialogHeader>
      <AlertDialogTitle>Create a New Repo</AlertDialogTitle>
      </AlertDialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit) } className="space-y-8">

    <div className="flex gap-2 items-center -mb-6">
    <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem
            className= " w-1/3">
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  className= ""
                {...field} value={displayName} disabled/>
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="mt-5 text-lg">/</p>
      <FormField
          control={form.control}
          name="repo"
          render={({ field }) => (
            <FormItem
              className= "w-2/3"
            >
              <FormLabel>Repo Name</FormLabel>
              <FormControl>
                <Input placeholder="Eg: My new project" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
</div>
<p className={cn("text-[0.8rem] text-slate-500 dark:text-slate-400")}>Great repo names are short and memorable.</p>
<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description <span className="text-gray-500 text-xs">(optional)</span></FormLabel>
              <FormControl>
                <Input placeholder="Eg: My new project" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.id === field.value
                          )?.name
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <Command>
                    <CommandInput
                      placeholder="Search language..."
                      className="h-9"
                    />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.name}
                          key={language.id}
                          onSelect={() => {
                            form.setValue("language", language.id)
                          }}
                        >
                          {language.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              language.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FormDescription>
                The language you want to code in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    
                    <FormLabel className="font-normal cursor-pointer">
                      <div className="flex gap-1">
                      <div className="text-2xl">
    <RiGlobalLine />
    </div>
                    <div>
                      <div className="font-medium">Public</div>
                      <div className= {cn("text-[0.8rem] font-normal text-slate-500 dark:text-slate-400 mt-1")}>Anyone on the internet can see this repo</div>
                      </div>
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      <div className="flex gap-1">
                      <div className="text-2xl">
    <RiGitRepositoryPrivateLine />
    </div>
                  <div>
                    <div className="font-medium">Private</div>
      <div
      className= {cn("text-[0.8rem] font-normal text-slate-500 dark:text-slate-400 mt-1")}
      >Only you will be able to see this repo</div>
      </div>
      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        {!loading ? 
        (
          <Button type="submit" className='ml-3'>Create Repo</Button>
        ) :
        (
          <Button disabled className="ml-3">
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Creating Repo
    </Button>
        )
      }     


    </form>
    </Form>
</>
  )
}

export default NewForm