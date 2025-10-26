// src/components/AdminDashboard.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { AfricanPattern } from "../components/AfricanPattern";
import api from "../api/api";

type Contact = {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
  email: string;
  message: string;
  created_at?: string;
};

type NewsItem = {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  pdf_url?: string | null;
  readTime?: string;
  date?: string;
};

export function Dashboard() {
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [newNewsForm, setNewNewsForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    pdf: null as File | null,
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await api.get("/contacts/admin/");
      setContacts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const res = await api.get("/news");
      const items: NewsItem[] = (res.data || []).map((n: any) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        category: n.category,
        pdf_url: n.pdf_url || n.pdfUrl,
        readTime:
          n.readTime || (n.read_time ? `${n.read_time} min read` : undefined),
        date: n.date || n.created_at || n.createdAt,
      }));
      setNews(items);
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNewsForm({ ...newNewsForm, pdf: e.target.files?.[0] ?? null });
  };

  const handleCreateArticle = async () => {
    setMessage(null);
    if (!newNewsForm.title) {
      setMessage("Title is required");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("title", newNewsForm.title);
      fd.append("excerpt", newNewsForm.excerpt);
      fd.append("content", newNewsForm.content);
      fd.append("category", newNewsForm.category);
      if (newNewsForm.pdf) fd.append("pdf", newNewsForm.pdf);

      const token = localStorage.getItem("token");

      await api.post("/news/admin", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Article created successfully!");
      setIsEditingNews(false);
      setNewNewsForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        pdf: null,
      });
      fetchNews();
    } catch (err: any) {
      console.error("Failed to create article", err);
      setMessage(err?.response?.data?.msg || "Failed to create article");
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Delete this article?")) return;
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/news/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNews();
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete article");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/btx-capital/admin/login";
  };

  return (
    <section className="relative min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 text-gray-200/5">
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              BTX Capital <span className="text-blue-600">Management</span>
            </h1>
            <p className="text-gray-500 text-lg mt-2 max-w-xl">
              Organize and manage contact messages and news content efficiently.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="messages" className="space-y-12">
          <TabsList className="bg-white border border-gray-200 rounded-xl shadow-md p-1">
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-lg px-5 py-2 transition"
            >
              Contact Messages
              <Badge className="ml-2 bg-red-500 text-white text-xs">
                {contacts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-lg px-5 py-2 transition"
            >
              News Management
            </TabsTrigger>
          </TabsList>

          {/* Contact Messages */}
          <TabsContent value="messages">
            {loadingContacts ? (
              <p className="text-gray-400">Loading messages...</p>
            ) : contacts.length === 0 ? (
              <p className="text-gray-400">No messages available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((c) => (
                  <Card
                    key={c.id}
                    className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {c.first_name || c.name || "Unknown"}{" "}
                        {c.last_name || ""}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        {c.email}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {c.message}
                      </p>
                    </div>
                    <div className="text-gray-400 text-xs mt-4 text-right">
                      {new Date(c.created_at || "").toLocaleString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* News Management */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                News Articles
              </h2>
              <Button
                onClick={() => setIsEditingNews(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition"
              >
                Create Article
              </Button>
            </div>

            {/* New Article Form */}
            {isEditingNews && (
              <Card className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg mb-6 p-6">
                <CardHeader>
                  <CardTitle className="text-gray-900 text-xl">
                    New Article
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    value={newNewsForm.title}
                    onChange={(e) =>
                      setNewNewsForm({ ...newNewsForm, title: e.target.value })
                    }
                    placeholder="Title"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-lg"
                  />
                  <Textarea
                    value={newNewsForm.excerpt}
                    onChange={(e) =>
                      setNewNewsForm({
                        ...newNewsForm,
                        excerpt: e.target.value,
                      })
                    }
                    placeholder="Excerpt"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-lg"
                  />
                  <Textarea
                    value={newNewsForm.content}
                    onChange={(e) =>
                      setNewNewsForm({
                        ...newNewsForm,
                        content: e.target.value,
                      })
                    }
                    placeholder="Content"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-lg min-h-[150px]"
                  />
                  <Input
                    value={newNewsForm.category}
                    onChange={(e) =>
                      setNewNewsForm({
                        ...newNewsForm,
                        category: e.target.value,
                      })
                    }
                    placeholder="Category"
                    className="bg-gray-50 border-gray-200 text-gray-900 rounded-lg"
                  />

                  <div className="space-y-2">
                    <label className="text-gray-500 text-sm font-medium">
                      Attach PDF (optional)
                    </label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="bg-gray-50 border-gray-200 text-gray-900 cursor-pointer rounded-lg"
                    />
                    {newNewsForm.pdf && (
                      <p className="text-blue-600 text-sm mt-1">
                        Selected: {newNewsForm.pdf.name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      onClick={handleCreateArticle}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingNews(false);
                        setNewNewsForm({
                          title: "",
                          excerpt: "",
                          content: "",
                          category: "",
                          pdf: null,
                        });
                      }}
                      variant="outline"
                      className="px-5 py-2 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>

                  {message && (
                    <p className="text-sm mt-2 text-blue-600">{message}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* News List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingNews ? (
                <p className="text-gray-400">Loading news...</p>
              ) : news.length === 0 ? (
                <p className="text-gray-400">No news articles yet.</p>
              ) : (
                news.map((n) => (
                  <Card
                    key={n.id}
                    className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {n.title}
                      </div>
                      {n.excerpt && (
                        <div className="text-gray-500 text-sm mt-1">
                          {n.excerpt}
                        </div>
                      )}
                      {n.pdf_url && (
                        <a
                          href={n.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline mt-2 block text-sm"
                        >
                          Download PDF
                        </a>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-gray-400 text-xs">{n.readTime}</div>
                      <Button
                        onClick={() => handleDeleteNews(n.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-lg shadow-md transition"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
