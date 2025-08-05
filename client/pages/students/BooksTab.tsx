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
import { BookOpen, Plus, Edit, Trash2, Download, Upload } from "lucide-react";
import { toast } from "sonner";

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  price: number;
  image: string;
  pdfUrl: string;
  status: "available" | "borrowed";
  isbn: string;
  publisher: string;
  publishedYear: string;
  pages: number;
  language: string;
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    author: "John Smith",
    subject: "Web Development",
    price: 599,
    image: "/placeholder.svg",
    pdfUrl: "/books/web-dev-intro.pdf",
    status: "available",
    isbn: "978-0123456789",
    publisher: "Tech Publications",
    publishedYear: "2023",
    pages: 450,
    language: "English",
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    author: "Jane Doe",
    subject: "Data Science",
    price: 799,
    image: "/placeholder.svg",
    pdfUrl: "/books/data-science-fundamentals.pdf",
    status: "borrowed",
    isbn: "978-0987654321",
    publisher: "Science Press",
    publishedYear: "2023",
    pages: 650,
    language: "English",
  },
];

export default function BooksTab() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    subject: "",
    price: "",
    isbn: "",
    publisher: "",
    publishedYear: "",
    pages: "",
    language: "",
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      setBooks(
        books.map((book) =>
          book.id === editingBook.id
            ? {
                ...book,
                ...bookForm,
                price: parseFloat(bookForm.price),
                pages: parseInt(bookForm.pages),
              }
            : book,
        ),
      );
      toast.success("Book updated successfully");
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        ...bookForm,
        price: parseFloat(bookForm.price),
        pages: parseInt(bookForm.pages),
        image: "/placeholder.svg",
        pdfUrl: "/books/default.pdf",
        status: "available",
      };
      setBooks([...books, newBook]);
      toast.success("Book added successfully");
    }
    resetBookForm();
  };

  const resetBookForm = () => {
    setBookForm({
      title: "",
      author: "",
      subject: "",
      price: "",
      isbn: "",
      publisher: "",
      publishedYear: "",
      pages: "",
      language: "",
    });
    setEditingBook(null);
    setIsBookDialogOpen(false);
  };

  const editBook = (book: Book) => {
    setBookForm({
      title: book.title,
      author: book.author,
      subject: book.subject,
      price: book.price.toString(),
      isbn: book.isbn,
      publisher: book.publisher,
      publishedYear: book.publishedYear,
      pages: book.pages.toString(),
      language: book.language,
    });
    setEditingBook(book);
    setIsBookDialogOpen(true);
  };

  const deleteBook = (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId));
    toast.success("Book deleted successfully");
  };

  const toggleBookStatus = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId
          ? {
              ...book,
              status: book.status === "available" ? "borrowed" : "available",
            }
          : book,
      ),
    );
    toast.success("Book status updated successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Books Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage educational books, resources, and digital library
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Book Collection</span>
          </CardTitle>
          <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingBook ? "Edit Book" : "Add New Book"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Book Title</Label>
                    <Input
                      id="title"
                      value={bookForm.title}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={bookForm.author}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, author: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={bookForm.subject}
                      onValueChange={(value) =>
                        setBookForm({ ...bookForm, subject: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Web Development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="Data Science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="Mobile Development">
                          Mobile Development
                        </SelectItem>
                        <SelectItem value="UI/UX Design">
                          UI/UX Design
                        </SelectItem>
                        <SelectItem value="Programming">Programming</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={bookForm.price}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, price: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={bookForm.isbn}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, isbn: e.target.value })
                      }
                      placeholder="978-0123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      value={bookForm.publisher}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, publisher: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="publishedYear">Published Year</Label>
                    <Input
                      id="publishedYear"
                      value={bookForm.publishedYear}
                      onChange={(e) =>
                        setBookForm({
                          ...bookForm,
                          publishedYear: e.target.value,
                        })
                      }
                      placeholder="2023"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">Total Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={bookForm.pages}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, pages: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={bookForm.language}
                      onValueChange={(value) =>
                        setBookForm({ ...bookForm, language: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Book Cover Image</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload book cover</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose Image
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>PDF File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload PDF file</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose PDF
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetBookForm}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingBook ? "Update Book" : "Add Book"}
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
                <TableHead>Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.subject}</TableCell>
                  <TableCell>₹{book.price}</TableCell>
                  <TableCell>{book.pages}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        book.status === "available" ? "default" : "secondary"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleBookStatus(book.id)}
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editBook(book)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteBook(book.id)}
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
    </div>
  );
}
