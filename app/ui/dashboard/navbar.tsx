'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { ThemeSwitcher } from '@/app/ui/theme-switcher';
import { User } from '@heroui/user';
import { Session } from 'next-auth';
import { callSignOut } from '@/app/ui/dashboard/actions';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function NavigationBar({
  session,
}: {
  session: Session | null;
}) {
  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <div className="flex flex-row items-center leading-none">
          <GlobeAltIcon className="h-12 w-12 rotate-15" />
        </div>
      </NavbarBrand>
      <NavbarContent justify="end">
        {session?.user ? (
          <Dropdown>
            <DropdownTrigger>
              <User
                classNames={{
                  base: 'cursor-pointer',
                }}
                avatarProps={{ src: session.user.image?.toString() }}
                name={session.user.name}
                description={session.user.email}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownSection showDivider>
                <DropdownItem key="dashboard" href="/dashboard">
                  Dashboard
                </DropdownItem>
                <DropdownItem key="journal" href="/dashboard/journal">
                  Journal
                </DropdownItem>
                <DropdownItem key="tasks" href="/dashboard/tasks">
                  Tasks
                </DropdownItem>
                <DropdownItem key="profile" href="/dashboard/profile">
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="theme"
                  classNames={{
                    base: 'hover:bg-transparent! cursor-default',
                    title: 'flex items-center justify-between gap-10',
                  }}
                >
                  Theme
                  <ThemeSwitcher />
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="log-out" onPress={callSignOut}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                href="/login"
                color="primary"
                data-testid="login-link"
              >
                Log in
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} href="/register" data-testid="register-link">
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
