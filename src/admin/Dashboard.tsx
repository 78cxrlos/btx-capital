import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AfricanPattern } from "../components/AfricanPattern";

export function Dashboard() {
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [newNewsForm, setNewNewsForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  });

  return (
    <section className="py-24 min-h-screen bg-gradient-to-br from-stone-900 via-amber-900/20 to-stone-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 text-amber-600/5">
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            <span className="text-amber-400 tracking-wider uppercase">
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl leading-tight">
            BTX Capital <span className="text-amber-400">Management</span>
          </h1>
          <p className="text-stone-300 text-lg mt-4">
            Manage contact messages and news content for the BTX Capital website
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="messages" className="space-y-8">
          <TabsList className="bg-white/10 border border-amber-600/20">
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              Contact Messages
              <Badge className="ml-2 bg-red-500 text-white text-xs">0</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              News Management
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-white/5 border-amber-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-400">No messages yet.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Management Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">News Articles</h2>
              <Button
                onClick={() => setIsEditingNews(true)}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Create Article
              </Button>
            </div>

            {isEditingNews && (
              <Card className="bg-white/5 border-amber-600/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">New Article</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={newNewsForm.title}
                    onChange={(e) =>
                      setNewNewsForm({ ...newNewsForm, title: e.target.value })
                    }
                    placeholder="Title"
                    className="bg-white/10 border-amber-600/20 text-white"
                  />
                  <Textarea
                    value={newNewsForm.excerpt}
                    onChange={(e) =>
                      setNewNewsForm({ ...newNewsForm, excerpt: e.target.value })
                    }
                    placeholder="Excerpt"
                    className="bg-white/10 border-amber-600/20 text-white"
                  />
                  <Textarea
                    value={newNewsForm.content}
                    onChange={(e) =>
                      setNewNewsForm({ ...newNewsForm, content: e.target.value })
                    }
                    placeholder="Content"
                    className="bg-white/10 border-amber-600/20 text-white min-h-[150px]"
                  />
                  <Button
                    onClick={() => {
                      setIsEditingNews(false);
                      setNewNewsForm({ title: "", excerpt: "", content: "", category: "" });
                    }}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Save (Placeholder)
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white/5 border-amber-600/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-stone-400">No news articles yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
