import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Share2,
  Tag,
  Clock,
  User,
  Heart,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorImage: string;
  featuredImage: string;
  status: "draft" | "published" | "scheduled";
  publishDate: string;
  createdDate: string;
  views: number;
  likes: number;
  comments: number;
  seoTitle: string;
  seoDescription: string;
  slug: string;
}

interface BlogCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  color: string;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  status: "approved" | "pending" | "spam";
  createdDate: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Future of Education Technology",
    content: "<p>Educational technology is revolutionizing...</p>",
    excerpt: "Exploring the latest trends in educational technology",
    category: "Technology",
    tags: ["EdTech", "Innovation", "Future"],
    author: "Dr. Sarah Johnson",
    authorImage: "/placeholder.svg",
    featuredImage: "/placeholder.svg",
    status: "published",
    publishDate: "2024-01-15",
    createdDate: "2024-01-14",
    views: 1250,
    likes: 89,
    comments: 23,
    seoTitle: "Future of Education Technology - EduAdmin Blog",
    seoDescription:
      "Discover the latest trends and innovations in educational technology",
    slug: "future-of-education-technology",
  },
  {
    id: "2",
    title: "Effective Online Learning Strategies",
    content: "<p>Online learning has become essential...</p>",
    excerpt: "Best practices for effective online education",
    category: "Education",
    tags: ["Online Learning", "Strategies", "Tips"],
    author: "Prof. Mike Chen",
    authorImage: "/placeholder.svg",
    featuredImage: "/placeholder.svg",
    status: "published",
    publishDate: "2024-01-10",
    createdDate: "2024-01-09",
    views: 890,
    likes: 67,
    comments: 15,
    seoTitle: "Effective Online Learning Strategies",
    seoDescription: "Learn the best practices for online education success",
    slug: "effective-online-learning-strategies",
  },
];

const mockCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Technology",
    description: "Educational technology and innovation",
    postCount: 15,
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Education",
    description: "Teaching methods and educational insights",
    postCount: 23,
    color: "#10B981",
  },
  {
    id: "3",
    name: "Career",
    description: "Career guidance and professional development",
    postCount: 12,
    color: "#F59E0B",
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: "John Doe",
    email: "john@example.com",
    content:
      "Great article! Very insightful information about education technology.",
    status: "approved",
    createdDate: "2024-01-16",
  },
  {
    id: "2",
    postId: "1",
    author: "Jane Smith",
    email: "jane@example.com",
    content: "This needs to be moderated for inappropriate content.",
    status: "pending",
    createdDate: "2024-01-17",
  },
];

const mockSocialLinks: SocialLink[] = [
  {
    id: "1",
    platform: "Facebook",
    url: "https://facebook.com/eduadmin",
    icon: "facebook",
    isActive: true,
  },
  {
    id: "2",
    platform: "Twitter",
    url: "https://twitter.com/eduadmin",
    icon: "twitter",
    isActive: true,
  },
  {
    id: "3",
    platform: "LinkedIn",
    url: "https://linkedin.com/company/eduadmin",
    icon: "linkedin",
    isActive: true,
  },
];

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [categories, setCategories] = useState<BlogCategory[]>(mockCategories);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(mockSocialLinks);
  const [activeTab, setActiveTab] = useState("posts");
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(
    null,
  );
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    author: "",
    publishDate: "",
    seoTitle: "",
    seoDescription: "",
    slug: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = postForm.tags.split(",").map((tag) => tag.trim());

    if (editingPost) {
      setPosts(
        posts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                ...postForm,
                tags: tagsArray,
              }
            : post,
        ),
      );
      toast.success("Blog post updated successfully");
    } else {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...postForm,
        tags: tagsArray,
        authorImage: "/placeholder.svg",
        featuredImage: "/placeholder.svg",
        status: "draft",
        createdDate: new Date().toISOString().split("T")[0],
        views: 0,
        likes: 0,
        comments: 0,
      };
      setPosts([...posts, newPost]);
      toast.success("Blog post created successfully");
    }
    resetPostForm();
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...categoryForm }
            : category,
        ),
      );
      toast.success("Category updated successfully");
    } else {
      const newCategory: BlogCategory = {
        id: Date.now().toString(),
        ...categoryForm,
        postCount: 0,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully");
    }
    resetCategoryForm();
  };

  const resetPostForm = () => {
    setPostForm({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      author: "",
      publishDate: "",
      seoTitle: "",
      seoDescription: "",
      slug: "",
    });
    setEditingPost(null);
    setIsPostDialogOpen(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: "",
      description: "",
      color: "#3B82F6",
    });
    setEditingCategory(null);
    setIsCategoryDialogOpen(false);
  };

  const editPost = (post: BlogPost) => {
    setPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags.join(", "),
      author: post.author,
      publishDate: post.publishDate,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      slug: post.slug,
    });
    setEditingPost(post);
    setIsPostDialogOpen(true);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
    toast.success("Blog post deleted successfully");
  };

  const updatePostStatus = (id: string, status: BlogPost["status"]) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, status } : post)),
    );
    toast.success(`Post ${status} successfully`);
  };

  const updateCommentStatus = (id: string, status: Comment["status"]) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, status } : comment,
      ),
    );
    toast.success(`Comment ${status} successfully`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage blog posts, categories, and content
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        {/* Blog Posts Tab */}
        <TabsContent value="posts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Blog Posts</span>
              </CardTitle>
              <Dialog
                open={isPostDialogOpen}
                onOpenChange={setIsPostDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingPost(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                          id="title"
                          value={postForm.title}
                          onChange={(e) =>
                            setPostForm({ ...postForm, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={postForm.category}
                          onValueChange={(value) =>
                            setPostForm({ ...postForm, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={postForm.author}
                          onChange={(e) =>
                            setPostForm({ ...postForm, author: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publishDate">Publish Date</Label>
                        <Input
                          id="publishDate"
                          type="date"
                          value={postForm.publishDate}
                          onChange={(e) =>
                            setPostForm({
                              ...postForm,
                              publishDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={postForm.tags}
                          onChange={(e) =>
                            setPostForm({ ...postForm, tags: e.target.value })
                          }
                          placeholder="EdTech, Innovation, Future"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={postForm.excerpt}
                        onChange={(e) =>
                          setPostForm({ ...postForm, excerpt: e.target.value })
                        }
                        rows={2}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={postForm.content}
                        onChange={(e) =>
                          setPostForm({ ...postForm, content: e.target.value })
                        }
                        rows={8}
                        placeholder="Write your blog post content here..."
                        required
                      />
                    </div>

                    {/* SEO Section */}
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-4">
                        SEO Settings
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="seoTitle">SEO Title</Label>
                          <Input
                            id="seoTitle"
                            value={postForm.seoTitle}
                            onChange={(e) =>
                              setPostForm({
                                ...postForm,
                                seoTitle: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="slug">URL Slug</Label>
                          <Input
                            id="slug"
                            value={postForm.slug}
                            onChange={(e) =>
                              setPostForm({ ...postForm, slug: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seoDescription">SEO Description</Label>
                        <Textarea
                          id="seoDescription"
                          value={postForm.seoDescription}
                          onChange={(e) =>
                            setPostForm({
                              ...postForm,
                              seoDescription: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Featured Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Upload featured image
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose Image
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetPostForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingPost ? "Update" : "Create"} Post
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-sm text-gray-500">
                              {post.excerpt.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: categories.find(
                              (c) => c.name === post.category,
                            )?.color,
                          }}
                        >
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{post.author}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={post.status}
                          onValueChange={(value: BlogPost["status"]) =>
                            updatePostStatus(post.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : post.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {post.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm">
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingPost(post)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editPost(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Categories</CardTitle>
              <Dialog
                open={isCategoryDialogOpen}
                onOpenChange={setIsCategoryDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCategory(null)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? "Edit Category" : "Add New Category"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Input
                        id="name"
                        value={categoryForm.name}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={categoryForm.description}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        type="color"
                        value={categoryForm.color}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            color: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetCategoryForm}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingCategory ? "Update" : "Add"} Category
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <h3 className="text-lg font-semibold">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {category.postCount} posts
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Comments Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{comment.author}</div>
                          <div className="text-sm text-gray-500">
                            {comment.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {comment.content.substring(0, 100)}...
                        </p>
                      </TableCell>
                      <TableCell>
                        {posts.find((p) => p.id === comment.postId)?.title}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={comment.status}
                          onValueChange={(value: Comment["status"]) =>
                            updateCommentStatus(comment.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <Badge
                              variant={
                                comment.status === "approved"
                                  ? "default"
                                  : comment.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {comment.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="spam">Spam</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(comment.createdDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Social Media Links</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialLinks.map((link) => (
                  <Card key={link.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          {link.platform}
                        </h3>
                        <Badge
                          variant={link.isActive ? "default" : "secondary"}
                        >
                          {link.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <Input
                        value={link.url}
                        onChange={() => {}}
                        placeholder={`${link.platform} URL`}
                        className="mb-4"
                      />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant={link.isActive ? "destructive" : "default"}
                          size="sm"
                        >
                          {link.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Post Dialog */}
      {viewingPost && (
        <Dialog open={!!viewingPost} onOpenChange={() => setViewingPost(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingPost.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={viewingPost.featuredImage}
                alt={viewingPost.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>By {viewingPost.author}</span>
                <span>•</span>
                <span>
                  {new Date(viewingPost.publishDate).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>{viewingPost.views} views</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {viewingPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: viewingPost.content }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
