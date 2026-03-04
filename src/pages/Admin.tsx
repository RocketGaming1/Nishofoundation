import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, LogOut, Home, Upload } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  external_link: string | null;
  is_featured: boolean | null;
  published_at: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  external_link: string | null;
  is_active: boolean | null;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  tagline: string | null;
  background_image_url: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [newNews, setNewNews] = useState({ title: '', excerpt: '', content: '', image_url: '', external_link: '', is_featured: false });
  const [newProject, setNewProject] = useState({ title: '', description: '', image_url: '', external_link: '' });
  const [newHeroSlide, setNewHeroSlide] = useState({ title: '', subtitle: '', tagline: '', background_image_url: '', sort_order: 0 });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAllData();
    }
  }, [user, isAdmin]);

  const fetchAllData = async () => {
    const [newsRes, projectsRes, heroRes] = await Promise.all([
      supabase.from('news_articles').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('hero_slides').select('*').order('sort_order', { ascending: true }),
    ]);

    if (newsRes.data) setNews(newsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    if (heroRes.data) setHeroSlides(heroRes.data);
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Upload Failed', description: uploadError.message, variant: 'destructive' });
      return null;
    }

    const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadImage(file);
    if (url) {
      setter(url);
      toast({ title: 'Image Uploaded', description: 'Image uploaded successfully.' });
    }
  };

  // News CRUD
  const addNews = async () => {
    if (!newNews.title) return;
    setIsSubmitting(true);
    
    const { error } = await supabase.from('news_articles').insert([{
      ...newNews,
      created_by: user?.id,
    }]);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'News article added.' });
      setNewNews({ title: '', excerpt: '', content: '', image_url: '', external_link: '', is_featured: false });
      fetchAllData();
    }
    setIsSubmitting(false);
  };

  const deleteNews = async (id: string) => {
    const { error } = await supabase.from('news_articles').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'News article deleted.' });
      fetchAllData();
    }
  };

  // Projects CRUD
  const addProject = async () => {
    if (!newProject.title) return;
    setIsSubmitting(true);
    
    const { error } = await supabase.from('projects').insert([{
      ...newProject,
      created_by: user?.id,
    }]);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Project added.' });
      setNewProject({ title: '', description: '', image_url: '', external_link: '' });
      fetchAllData();
    }
    setIsSubmitting(false);
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Project deleted.' });
      fetchAllData();
    }
  };

  // Hero Slides CRUD
  const addHeroSlide = async () => {
    if (!newHeroSlide.title) return;
    setIsSubmitting(true);
    
    const { error } = await supabase.from('hero_slides').insert([{
      ...newHeroSlide,
      created_by: user?.id,
    }]);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Hero slide added.' });
      setNewHeroSlide({ title: '', subtitle: '', tagline: '', background_image_url: '', sort_order: 0 });
      fetchAllData();
    }
    setIsSubmitting(false);
  };

  const deleteHeroSlide = async (id: string) => {
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Hero slide deleted.' });
      fetchAllData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have admin privileges. Please contact an administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" /> Go Home
            </Button>
            <Button variant="destructive" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            N<span className="text-[hsl(0,85%,50%)]">I</span>SHO
            <span className="text-sm text-muted-foreground ml-2">Admin Panel</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" /> View Site
            </Button>
            <Button variant="destructive" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news">News Articles</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="hero">Hero Slides</TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add News Article</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newNews.title}
                      onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                      placeholder="Article title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>External Link</Label>
                    <Input
                      value={newNews.external_link}
                      onChange={(e) => setNewNews({ ...newNews, external_link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Input
                    value={newNews.excerpt}
                    onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                    placeholder="Brief summary"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={newNews.content}
                    onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                    placeholder="Full article content"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newNews.image_url}
                      onChange={(e) => setNewNews({ ...newNews, image_url: e.target.value })}
                      placeholder="Image URL or upload"
                    />
                    <Button variant="outline" asChild className="shrink-0">
                      <label>
                        <Upload className="h-4 w-4 mr-2" /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setNewNews({ ...newNews, image_url: url }))}
                        />
                      </label>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newNews.is_featured}
                    onChange={(e) => setNewNews({ ...newNews, is_featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Featured article</Label>
                </div>
                <Button onClick={addNews} disabled={isSubmitting || !newNews.title}>
                  <Plus className="h-4 w-4 mr-2" /> Add Article
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Articles ({news.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {news.length === 0 ? (
                  <p className="text-muted-foreground">No news articles yet.</p>
                ) : (
                  <div className="space-y-2">
                    {news.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.excerpt || 'No excerpt'}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => deleteNews(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Project title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>External Link</Label>
                    <Input
                      value={newProject.external_link}
                      onChange={(e) => setNewProject({ ...newProject, external_link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newProject.image_url}
                      onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                      placeholder="Image URL or upload"
                    />
                    <Button variant="outline" asChild className="shrink-0">
                      <label>
                        <Upload className="h-4 w-4 mr-2" /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setNewProject({ ...newProject, image_url: url }))}
                        />
                      </label>
                    </Button>
                  </div>
                </div>
                <Button onClick={addProject} disabled={isSubmitting || !newProject.title}>
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Projects ({projects.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <p className="text-muted-foreground">No projects yet.</p>
                ) : (
                  <div className="space-y-2">
                    {projects.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description || 'No description'}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => deleteProject(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Slides Tab */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Hero Slide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newHeroSlide.title}
                      onChange={(e) => setNewHeroSlide({ ...newHeroSlide, title: e.target.value })}
                      placeholder="Slide title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={newHeroSlide.sort_order}
                      onChange={(e) => setNewHeroSlide({ ...newHeroSlide, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    value={newHeroSlide.subtitle}
                    onChange={(e) => setNewHeroSlide({ ...newHeroSlide, subtitle: e.target.value })}
                    placeholder="Slide subtitle"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={newHeroSlide.tagline}
                    onChange={(e) => setNewHeroSlide({ ...newHeroSlide, tagline: e.target.value })}
                    placeholder="Slide tagline"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Image</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newHeroSlide.background_image_url}
                      onChange={(e) => setNewHeroSlide({ ...newHeroSlide, background_image_url: e.target.value })}
                      placeholder="Image URL or upload"
                    />
                    <Button variant="outline" asChild className="shrink-0">
                      <label>
                        <Upload className="h-4 w-4 mr-2" /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setNewHeroSlide({ ...newHeroSlide, background_image_url: url }))}
                        />
                      </label>
                    </Button>
                  </div>
                </div>
                <Button onClick={addHeroSlide} disabled={isSubmitting || !newHeroSlide.title}>
                  <Plus className="h-4 w-4 mr-2" /> Add Slide
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Slides ({heroSlides.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {heroSlides.length === 0 ? (
                  <p className="text-muted-foreground">No hero slides yet.</p>
                ) : (
                  <div className="space-y-2">
                    {heroSlides.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">Order: {item.sort_order} | {item.subtitle || 'No subtitle'}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => deleteHeroSlide(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
