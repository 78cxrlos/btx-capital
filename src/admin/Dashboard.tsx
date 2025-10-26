// src/components/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  display_name?: string;
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
  isPdf?: boolean;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Normalise fields from backend to match frontend types (pdfUrl vs pdf_url)
      const items: NewsItem[] = (res.data || []).map((n: any) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        category: n.category,
        pdf_url: n.pdf_url || n.pdfUrl || n.pdfUrl || n.pdfUrl,
        readTime: n.readTime || (n.read_time ? `${n.read_time} min read` : undefined),
        date: n.date || n.created_at || n.createdAt,
        isPdf: Boolean(n.pdf_url || n.pdfUrl || n.pdfUrl),
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
  
    // Validation
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
  
      // Get token from localStorage
      const token = localStorage.getItem("token");
  
      // Send POST request to backend
      await api.post("/news/admin", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Success: reset form and fetch updated news list
      setMessage("Article created successfully!");
      setIsEditingNews(false);
      setNewNewsForm({ title: "", excerpt: "", content: "", category: "", pdf: null });
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <section className="py-24 min-h-screen bg-gray-50 text-gray-900 relative overflow-hidden">
  <div className="absolute inset-0 text-gray-200/5">
    <AfricanPattern className="w-full h-full" pattern="geometric" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
          BTX Capital <span className="text-blue-600">Management</span>
        </h1>
        <p className="text-gray-500 text-lg mt-3">Manage contact messages and news content for the BTX Capital website</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">Sign out</Button>
      </div>
    </div>

    <Tabs defaultValue="messages" className="space-y-12">
      <TabsList className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <TabsTrigger value="messages" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700">
          Contact Messages
          <Badge className="ml-2 bg-red-500 text-white text-xs">{contacts.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="news" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-700">
          News Management
        </TabsTrigger>
      </TabsList>

      <TabsContent value="messages" className="space-y-6">
        <Card className="bg-white rounded-xl shadow-md border border-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-900">Contact Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingContacts ? (
              <p className="text-gray-400">Loading...</p>
            ) : contacts.length === 0 ? (
              <p className="text-gray-400">No messages yet.</p>
            ) : (
              <div className="space-y-6">
                {contacts.map((c) => (
                  <div key={c.id} className="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900">{c.first_name || c.name || "Unknown"} {c.last_name || ""}</div>
                        <div className="text-sm text-gray-500">{c.email}</div>
                      </div>
                      <div className="text-sm text-gray-400">{new Date(c.created_at || "").toLocaleString()}</div>
                    </div>
                    <p className="mt-3 text-gray-600">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="news" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">News Articles</h2>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsEditingNews(true)} className="bg-blue-600 hover:bg-blue-700 text-white">Create Article</Button>
          </div>
        </div>

        {isEditingNews && (
          <Card className="bg-white rounded-xl shadow-md border border-gray-100 mb-6">
            <CardHeader>
              <CardTitle className="text-gray-900">New Article</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input value={newNewsForm.title} onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })} placeholder="Title" className="bg-gray-50 border-gray-200 text-gray-900" />
              <Textarea value={newNewsForm.excerpt} onChange={(e) => setNewNewsForm({ ...newNewsForm, excerpt: e.target.value })} placeholder="Excerpt" className="bg-gray-50 border-gray-200 text-gray-900" />
              <Textarea value={newNewsForm.content} onChange={(e) => setNewNewsForm({ ...newNewsForm, content: e.target.value })} placeholder="Content" className="bg-gray-50 border-gray-200 text-gray-900 min-h-[150px]" />
              <Input value={newNewsForm.category} onChange={(e) => setNewNewsForm({ ...newNewsForm, category: e.target.value })} placeholder="Category" className="bg-gray-50 border-gray-200 text-gray-900" />

              <div className="space-y-2">
                <label className="text-gray-500 text-sm font-medium">Attach PDF Document (optional)</label>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} className="bg-gray-50 border-gray-200 text-gray-900 cursor-pointer" />
                {newNewsForm.pdf && <p className="text-blue-600 text-sm mt-1">Selected file: {newNewsForm.pdf.name}</p>}
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={handleCreateArticle} className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                <Button onClick={() => { setIsEditingNews(false); setNewNewsForm({ title: "", excerpt: "", content: "", category: "", pdf: null }); }} variant="outline">Cancel</Button>
              </div>

              {message && <p className="text-sm mt-2 text-blue-600">{message}</p>}
            </CardContent>
          </Card>
        )}

        <Card className="bg-white rounded-xl shadow-md border border-gray-100">
          <CardContent className="p-6 space-y-4">
            {loadingNews ? (
              <p className="text-gray-400">Loading news...</p>
            ) : news.length === 0 ? (
              <p className="text-gray-400">No news articles yet.</p>
            ) : (
              <div className="space-y-6">
                {news.map((n) => (
                  <div key={n.id} className="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">{n.title}</div>
                      <div className="text-sm text-gray-500">{n.excerpt}</div>
                      {n.pdf_url && (
                        <div className="mt-2">
                          <a href={n.pdf_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">Download PDF</a>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-400">{n.readTime}</div>
                      <Button onClick={() => handleDeleteNews(n.id)} className="bg-red-500 hover:bg-red-600 text-sm text-white">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</section>

  );
}
