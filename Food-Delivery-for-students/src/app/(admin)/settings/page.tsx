"use client";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/(main)/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAdminProfile } from "@/lib/services/admin-update";
import { toast } from "sonner";

export default function AdminSettings() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateAdminProfile(formData);
      toast.success("Succesfully updated");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading ...</div>

  return (
    <div className="p-8 w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      
      <div className="grid gap-6">
        <Card className="bg-slate-50/50">
          <CardContent className="pt-6 flex items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-1">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  {user.role || "Admin"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <Button 
              className="bg-red-500 hover:bg-red-600 w-fit"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Шинэчилж байна..." : "Мэдээлэл шинэчлэх"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}