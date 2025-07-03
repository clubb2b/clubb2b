import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Shield, Crown, User, History, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  role: string; // Changed from union type to string to match database
  membership_tier?: string;
  created_at: string;
}

interface RoleChange {
  id: string;
  user_id: string;
  old_role: string;
  new_role: string;
  changed_by: string;
  changed_at: string;
  reason: string;
}

const RoleManagement = () => {
  const { user, isAdmin } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roleChanges, setRoleChanges] = useState<RoleChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [reason, setReason] = useState('');

  // Only admins can access this component
  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-muted-foreground">You need admin privileges to manage user roles.</p>
        </CardContent>
      </Card>
    );
  }

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load user profiles",
        variant: "destructive",
      });
    }
  };

  const fetchRoleChanges = async () => {
    try {
      const { data, error } = await supabase
        .from('role_changes')
        .select('*')
        .order('changed_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setRoleChanges(data || []);
    } catch (error) {
      console.error('Error fetching role changes:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchProfiles(), fetchRoleChanges()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole || !reason.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedUser.role === newRole) {
      toast({
        title: "Error",
        description: "User already has this role",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update user role
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', selectedUser.id);

      if (updateError) throw updateError;

      // Manual role change log (trigger should handle this, but adding as backup)
      const { error: logError } = await supabase
        .from('role_changes')
        .insert({
          user_id: selectedUser.id,
          old_role: selectedUser.role,
          new_role: newRole,
          reason: reason,
        });

      if (logError) console.error('Log error:', logError);

      toast({
        title: "Success",
        description: `Role updated successfully for ${selectedUser.first_name || 'user'}`,
      });

      // Refresh data
      await Promise.all([fetchProfiles(), fetchRoleChanges()]);
      
      // Reset form
      setIsDialogOpen(false);
      setSelectedUser(null);
      setNewRole('');
      setReason('');
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'vip': return <Crown className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'vip': return 'default';
      default: return 'secondary';
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = !searchTerm || 
      `${profile.first_name || ''} ${profile.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || profile.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading user management...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{profiles.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-bold">{profiles.filter(p => p.role === 'admin').length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Crown className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">VIP Members</p>
              <p className="text-2xl font-bold">{profiles.filter(p => p.role === 'vip').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Role Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {profile.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : 'Unnamed User'}
                      </p>
                      <p className="text-sm text-muted-foreground">{profile.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(profile.role)} className="flex items-center gap-1 w-fit">
                      {getRoleIcon(profile.role)}
                      {profile.role.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{profile.membership_tier || 'Basic'}</TableCell>
                  <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Dialog open={isDialogOpen && selectedUser?.id === profile.id} onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) {
                        setSelectedUser(null);
                        setNewRole('');
                        setReason('');
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(profile);
                            setNewRole(profile.role);
                          }}
                          disabled={profile.id === user?.id}
                        >
                          {profile.id === user?.id ? 'You' : 'Edit Role'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change User Role</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>User</Label>
                            <p className="text-sm text-muted-foreground">
                              {profile.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : 'Unnamed User'}
                            </p>
                          </div>
                          
                          <div>
                            <Label htmlFor="role">New Role</Label>
                            <Select value={newRole} onValueChange={setNewRole}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="vip">VIP Member</SelectItem>
                                <SelectItem value="admin">Administrator</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="reason">Reason for Change *</Label>
                            <Textarea
                              id="reason"
                              placeholder="Explain why this role change is necessary..."
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleRoleChange}>
                              Update Role
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Role Change History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {roleChanges.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No role changes recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roleChanges.slice(0, 10).map((change) => (
                  <TableRow key={change.id}>
                    <TableCell>
                      {change.user_id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{change.old_role}</Badge>
                        <span>→</span>
                        <Badge variant={getRoleBadgeVariant(change.new_role)}>{change.new_role}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{change.reason}</TableCell>
                    <TableCell>{new Date(change.changed_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;