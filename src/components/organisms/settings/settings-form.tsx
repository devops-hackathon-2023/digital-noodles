"use client"

import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/atoms/card";
import AccessTokensDataTable
  from "@/components/organisms/settings/dataTables/accessTokensDataTable/accessTokensDataTable";
import SshKeysDataTable from "@/components/organisms/settings/dataTables/sshKeysDataTable/sshKeysDataTable";
import {columns as sshColumn} from "@/components/organisms/settings/dataTables/sshKeysDataTable/columns";
import {accessTokens, sshKeys} from "@/components/organisms/settings/dataTables/data";
import {columns as accessTokenColumn} from "@/components/organisms/settings/dataTables/accessTokensDataTable/columns";


export function SettingsForm() {

  return (
    <div className={"w-full flex flex-col gap-3"}>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>
              Personal Access Tokens
            </h1>
          </CardTitle>
          <CardDescription>
            You can generate a personal access token for each application you use that needs access to the Dopo API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccessTokensDataTable columns={accessTokenColumn} data={accessTokens}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>
              SSH Keys
            </h1>
          </CardTitle>
          <CardDescription>
            SSH keys allow you to establish a secure connection between your computer and Dopo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SshKeysDataTable columns={sshColumn} data={sshKeys}/>
        </CardContent>
      </Card>
    </div>
  )
}