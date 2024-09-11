"use client"

import { signIn, signOut } from "next-auth/react"
import { FC, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Button 
        onClick={() => setShowModal(true)}
        className="bg-[#194D47] hover:bg-[#2D6E56]"  
      >
        Login
      </Button>

      <Dialog
        open={showModal}
        onOpenChange={() => {
          setShowModal(!showModal)
        }}
      >
        <DialogContent>
          <Tabs>
            <TabsList>
              <TabsTrigger value='account'>Log in</TabsTrigger>
            </TabsList>
            <TabsContent value='account'>
              <Card>
                <CardHeader>
                  <CardTitle>Log in</CardTitle>
                  <CardDescription>
                    Log into your account here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={async () => await signIn("google")}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SignIn