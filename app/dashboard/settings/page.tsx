"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mail, MessageSquare, Bot, Bell, Save, TestTube } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SettingsFormSkeleton } from "@/components/loading-skeletons"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({
    // Email Settings
    emailProvider: "smtp",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    emailFrom: "hr@company.com",

    // Slack Settings
    slackWebhookUrl: "",
    slackChannel: "#payroll",
    slackNotifications: true,

    // LLM Settings
    llmProvider: "openai",
    openaiApiKey: "",
    anthropicApiKey: "",

    // Notification Settings
    emailNotifications: true,
    slackAlerts: true,
    violationAlerts: true,
    processingUpdates: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  const testConnection = (type: string) => {
    toast({
      title: "Testing connection",
      description: `Testing ${type} connection...`,
    })
  }

  if (isLoading) {
    return (
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="h-5 w-16 bg-muted animate-pulse rounded" />
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 p-6">
          <div className="space-y-6">
            <div className="grid w-full grid-cols-4 gap-2 bg-muted p-1 rounded-lg">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 bg-background rounded animate-pulse" />
              ))}
            </div>
            <SettingsFormSkeleton />
          </div>
        </div>
      </SidebarInset>
    )
  }

  return (
    <SidebarInset>
      <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Settings</h1>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Tabs defaultValue="email" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <TabsList className="grid w-full grid-cols-4">
              {[
                { value: "email", icon: Mail, label: "Email" },
                { value: "slack", icon: MessageSquare, label: "Slack" },
                { value: "llm", icon: Bot, label: "AI/LLM" },
                { value: "notifications", icon: Bell, label: "Notifications" },
              ].map((tab, index) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                >
                  <TabsTrigger value={tab.value} className="flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>

          {/* Email Settings */}
          <TabsContent value="email">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>Configure email settings for payroll notifications and reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.smtpHost}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            smtpHost: e.target.value,
                          }))
                        }
                        placeholder="smtp.gmail.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.smtpPort}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            smtpPort: e.target.value,
                          }))
                        }
                        placeholder="587"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input
                      id="smtpUsername"
                      type="email"
                      value={settings.smtpUsername}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          smtpUsername: e.target.value,
                        }))
                      }
                      placeholder="your-email@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          smtpPassword: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailFrom">From Email</Label>
                    <Input
                      id="emailFrom"
                      type="email"
                      value={settings.emailFrom}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          emailFrom: e.target.value,
                        }))
                      }
                      placeholder="hr@company.com"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSave("Email")}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </Button>
                    <Button variant="outline" onClick={() => testConnection("email")}>
                      <TestTube className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Slack Settings */}
          <TabsContent value="slack">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Slack Integration
                </CardTitle>
                <CardDescription>Configure Slack notifications for payroll updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slackWebhook">Webhook URL</Label>
                  <Input
                    id="slackWebhook"
                    value={settings.slackWebhookUrl}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        slackWebhookUrl: e.target.value,
                      }))
                    }
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slackChannel">Default Channel</Label>
                  <Input
                    id="slackChannel"
                    value={settings.slackChannel}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        slackChannel: e.target.value,
                      }))
                    }
                    placeholder="#payroll"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="slackNotifications"
                    checked={settings.slackNotifications}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        slackNotifications: checked,
                      }))
                    }
                  />
                  <Label htmlFor="slackNotifications">Enable Slack notifications</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => handleSave("Slack")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={() => testConnection("Slack")}>
                    <TestTube className="mr-2 h-4 w-4" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LLM Settings */}
          <TabsContent value="llm">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI/LLM Configuration
                </CardTitle>
                <CardDescription>Configure AI models for payroll analysis and violation detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>OpenAI API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={settings.openaiApiKey}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            openaiApiKey: e.target.value,
                          }))
                        }
                        placeholder="sk-..."
                      />
                      {settings.openaiApiKey && <Badge variant="default">Connected</Badge>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Anthropic API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={settings.anthropicApiKey}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            anthropicApiKey: e.target.value,
                          }))
                        }
                        placeholder="sk-ant-..."
                      />
                      {settings.anthropicApiKey && <Badge variant="default">Connected</Badge>}
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">AI Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic violation detection</li>
                    <li>• Payroll anomaly analysis</li>
                    <li>• Smart error correction suggestions</li>
                    <li>• Compliance checking</li>
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => handleSave("AI/LLM")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={() => testConnection("AI")}>
                    <TestTube className="mr-2 h-4 w-4" />
                    Test API Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates for payroll processing</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          emailNotifications: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Slack Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                    </div>
                    <Switch
                      checked={settings.slackAlerts}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          slackAlerts: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Violation Alerts</Label>
                      <p className="text-sm text-muted-foreground">Immediate alerts for payroll violations</p>
                    </div>
                    <Switch
                      checked={settings.violationAlerts}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          violationAlerts: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Processing Updates</Label>
                      <p className="text-sm text-muted-foreground">Regular updates on payroll processing status</p>
                    </div>
                    <Switch
                      checked={settings.processingUpdates}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          processingUpdates: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave("Notifications")} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </SidebarInset>
  )
}
