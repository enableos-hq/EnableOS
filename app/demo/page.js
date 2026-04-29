'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, Inbox, Users, MessageSquare, BookOpen,
  Video, Activity, Calendar, TrendingUp, Trophy, Settings,
  LogOut, Plus, X, Check, Sparkles, Target, Star,
  ThumbsUp, ArrowRight, Zap, ChevronRight
} from 'lucide-react'
